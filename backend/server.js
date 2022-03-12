import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routers/userRouter.js';
import leaveRouter from './routers/leaveRouter.js';
import payrollRouter from './routers/payrollRouter.js';
import reportRouter from './routers/reportRouter.js';
import pharmacyRouter from './routers/pharmacyRouter.js';
import trendingShortageRouter from './routers/trendingShortageRouter.js';
import visitRouter from './routers/visitRouter.js';


dotenv.config();

const app = express();
app.use((request,response,next)=>{
  response.setHeader('Access-Control-Allow-Origin','*'),
  response.setHeader('Access-Control-Allow-Headers','*'),
  next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://ahmed2055:ahmed2055123@cluster0.plbaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

*/

mongoose.connect(process.env.MONGODB_URL || 'mongodb://ahmed2055:ahmed2055123@cluster0-shard-00-00.plbaa.mongodb.net:27017,cluster0-shard-00-01.plbaa.mongodb.net:27017,cluster0-shard-00-02.plbaa.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dps53r-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/leaves', leaveRouter)
app.use('/api/payrolls', payrollRouter)
app.use('/api/reports', reportRouter)
app.use('/api/pharmacies', pharmacyRouter)
app.use('/api/trendingShortages', trendingShortageRouter)
app.use('/api/visits', visitRouter)

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));


/*
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
*/


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];


io.on('connection', (socket) => {
  console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Sorry. I am not online right now',
        });
      }
    }
  });
});



httpServer.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});

