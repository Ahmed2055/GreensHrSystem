import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Pharmacy from '../models/pharmacyModel.js';


const pharmacyRouter = express.Router();

pharmacyRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
  
        console.log("request to get all pharmacies");
        const pharmacies = await Pharmacy.find({});
        res.send(pharmacies);
        
    })
  );



export default pharmacyRouter;