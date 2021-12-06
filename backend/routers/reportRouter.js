import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Report from '../models/reportModel.js';


const reportRouter = express.Router();


reportRouter.get(
    '/pharmacyReports/:pharmacyName',
    expressAsyncHandler(async (req, res) => {
      try {
        
        const pharmacyName = req.params.pharmacyName
        const pharmacyReports = await Report.find({ pharmacyName: pharmacyName }).sort({dayTimeStamp: -1})


  
        res.send(pharmacyReports)
  
      } catch (error){ res.status(500).send(error.message);}
  
    })
  );
  

reportRouter.get(
    '/pharmacyReportsDay/:pharmacyName',
    expressAsyncHandler(async (req, res) => {
      try {
        const reportDate = req.query.reportDate
        console.log(reportDate);
        
        const pharmacyName = req.params.pharmacyName
        const pharmacyReports = await Report.find({ pharmacyName: pharmacyName })

        const dayPharmacyReports = pharmacyReports.filter((report=> report.day == reportDate))

  
        res.send(dayPharmacyReports)
  
      } catch (error){ res.status(500).send(error.message);}
  
    })
  );


  reportRouter.post(
    '/addAReport',
    expressAsyncHandler(async (req, res) => {
      
  
      const report = new Report({
  
        day:   req.body.day ,
        dayTimeStamp:   req.body.dayTimeStamp ,
        dayType:   req.body.dayType ,
        pharmacyName:  req.body.pharmacyName ,
        firstPharmacist:  req.body.firstPharmacist ,
        firstRemarks:  req.body.firstRemarks ,
        firstSales:  req.body.firstSales ,
        firstShiftEnd:  req.body.firstShiftEnd ,
        secondPharmacist:  req.body.secondPharmacist ,
        secondRemarks:  req.body.secondRemarks ,
        secondSales:  req.body.secondSales ,
        secondShiftEnd:  req.body.secondShiftEnd ,

      });
  
      try {
        const createdReport = await report.save();

        res.send({  message:'Report Added successfully' });
  
    } catch (error){  res.send(error.message); }
  
    })
  );


  reportRouter.post(
    '/editAReport/:reportId',
    expressAsyncHandler(async (req, res) => {

      const reportId = req.params.reportId
      console.log('trying to edit a report')

      try {

        
        const report = await Report.findById(reportId);
        if (report) {
          report.dayType = req.body.dayType ;
          report.firstPharmacist = req.body.firstPharmacist ;
          report.firstRemarks = req.body.firstRemarks ;
          report.firstSales = req.body.firstSales ;
          report.firstShiftEnd = req.body.firstShiftEnd ;
          report.secondPharmacist = req.body.secondPharmacist ;
          report.secondRemarks = req.body.secondRemarks ;
          report.secondSales = req.body.secondSales ;
          report.secondShiftEnd = req.body.secondShiftEnd ;
      }

        const updatedReport = await report.save();   

        res.send({  message:'Report Updated successfully' });
  
    } catch (error){  res.send(error.message); }
  
    })
  );

export default reportRouter;