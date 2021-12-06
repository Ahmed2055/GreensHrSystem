import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Leave from '../models/leaveModel.js';

const leaveRouter = express.Router();


leaveRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    try {
      const leaves = await Leave.find({    })
      res.send(leaves)

    } catch (error){ res.status(500).send(error.message);}
  })
);

leaveRouter.get(
  '/leaveRequests',
  expressAsyncHandler(async (req, res) => {
    try {
      console.log('trying to fetch all leave requests');
      const leaves = await Leave.find({    })
      res.send(leaves)

    } catch (error){ res.status(500).send(error.message);}
  })
);

leaveRouter.get(
  '/returnRequests',
  expressAsyncHandler(async (req, res) => {
    try {
      console.log('trying to fetch all return requests');
      const leaves = await Leave.find({    })
      res.send(leaves)

    } catch (error){ res.status(500).send(error.message);}
  })
);


leaveRouter.post(
  '/addALeave',
  expressAsyncHandler(async (req, res) => {
 
    const leave = new Leave({

      requesterId:   req.body.requesterId,
      requesterName:   req.body.requesterName,
      requesterShortestName:  req.body.requesterShortestName,
      requesterEmail:  req.body.requesterEmail,
      status:  req.body.status,   
      dateRejoined:  req.body.dateRejoined,
      daysLate:   req.body.daysLate,
      dateFrom:   req.body.dateFrom,
      dateTo:  req.body.dateTo,
      natureLeave:  req.body.natureLeave,
      applyDate:  req.body.applyDate,
      natureLeave:  req.body.natureLeave,
      realDaysLeave:  req.body.realDaysLeave,
      maxDaysLeave:  req.body.maxDaysLeave,
      outsideTravelling:  req.body.outsideTravelling,
      comment:  req.body.comment,

    });

    try {
      const createdLeave = await leave.save();
      console.log(createdLeave)
      res.send({  message:'Leave Added successfully' });

  } catch (error){  res.send(error.message); }

  })
);





leaveRouter.get(
  '/userLeaves/:uid',
  expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.params.uid
      const leavesUser = await Leave.find({ requesterId: req.params.uid })

      res.send(leavesUser)

    } catch (error){ res.status(500).send(error.message);}

  })
);


leaveRouter.get(
  '/leaveDetails/:lid',
  expressAsyncHandler(async (req, res) => {

    try {
      const leaveId = req.params.lid
      console.log(leaveId)

      const leaveDetails = await Leave.find({ _id: req.params.lid })
      res.send(leaveDetails[0])
    } catch (error){ res.status(500).send(error.message);}
  })
);

leaveRouter.post(
  '/leaveUpdate/:lid',
  expressAsyncHandler(async (req, res) => {

    try {
      const leaveId = req.params.lid
      console.log(leaveId)

      const leave = await Leave.findById(req.params.lid )
      if(leave){
        leave.dateRejoinRequest = req.body.dateRejoinRequest || leave.dateRejoinRequest
        leave.dateRejoinRequestStatus = req.body.dateRejoinRequestStatus || leave.dateRejoinRequestStatus
        leave.status = req.body.status || leave.status
        leave.dateRejoined = req.body.dateRejoined || leave.dateRejoined
      }

      const updatedLeave = await leave.save();

      res.send(updatedLeave)

    } catch (error){ res.status(500).send(error.message);}
  })
);


/*
leaveRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);


*/

  export default leaveRouter;

      /*
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
    */