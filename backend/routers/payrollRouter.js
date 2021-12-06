import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Payroll from '../models/payrollModel.js';


const payrollRouter = express.Router();

payrollRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    try {
      const payrolls = await Payroll.find({    })
      res.send(payrolls)

    } catch (error){ res.status(500).send(error.message);}
  })
);

payrollRouter.get(
  '/userPayrolls/:uid',
  expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.params.uid
      const payrollsUser = await Payroll.find({ userId: userId })

      res.send(payrollsUser)

    } catch (error){ res.status(500).send(error.message);}

  })
);

payrollRouter.get(
  '/payrollDetails/:pid',
  expressAsyncHandler(async (req, res) => {

    try {
      const payrollId = req.params.pid
      console.log(payrollId)

      const payrollDetails = await Payroll.find({ _id: payrollId })
      res.send(payrollDetails[0])
    } catch (error){ res.status(500).send(error.message);}
  })
);


payrollRouter.post(
    '/addAPayroll',
    expressAsyncHandler(async (req, res) => {
      
  
      const payroll = new Payroll({
  
        userId:   req.body.userId ,
        userName:   req.body.userName ,
        basicPay:   req.body.basicPay ,
        campaigns:  req.body.campaigns ,
        deductions:  req.body.deductions ,
        fixedOverTime:  req.body.fixedOverTime ,
        housingAllowance:  req.body.housingAllowance ,
        incentives:  req.body.incentives ,
        netPay:  req.body.netPay ,
        otherIncentives:  req.body.otherIncentives ,
        overTimeAllowance:  req.body.overTimeAllowance ,
        overTimeHours:  req.body.overTimeHours ,
        overTimeRate:  req.body.overTimeRate ,
        percentage:  req.body.percentage ,
        ticketsAllowance:  req.body.ticketsAllowance ,
        transportAllowance:  req.body.transportAllowance ,
        remarks:  req.body.remarks ,    
        month:   req.body.month ,
        generalRemarks:  req.body.generalRemarks ,
        salaryOf:  req.body.salaryOf ,
      });
  
      try {
        console.log(payroll)
        const createdPayroll = await payroll.save();
        console.log(createdPayroll)
        res.send({  message:'Payroll Added successfully' });
  
    } catch (error){  res.send(error.message); }
  
    })
  );
  

export default payrollRouter;