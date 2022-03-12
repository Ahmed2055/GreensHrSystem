import express from "express";
import expressAsyncHandler from "express-async-handler";
import Visit from "../models/visitModel.js";
import User from "../models/userModel.js";

const visitRouter = express.Router();

visitRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        try {
            const visits = await Visit.find({}).limit(6);
            console.log("request to get all visits");
            res.send(visits);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
);

visitRouter.get(
    "/userVisits/:uid",
    expressAsyncHandler(async (req, res) => {
        try {
            const userId = req.params.uid;
            const visitsUser = await Visit.find({ evaluatedPharmacistId: req.params.uid });

            res.send(visitsUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
);

visitRouter.get(
    "/visitDetails/:vid",
    expressAsyncHandler(async (req, res) => {
        try {
            const visitId = req.params.vid;
            console.log(visitId);

            const visitDetails = await Visit.find({ _id: req.params.vid });
            const evaluatedPharmacistName = await User.findById(visitDetails[0].evaluatedPharmacistId);
            const evaluatingManagerName = await User.findById(visitDetails[0].evaluatingManager);

            const visitDetailsEdited = JSON.parse(JSON.stringify(visitDetails));
            visitDetailsEdited[0].evaluatedPharmacistName = evaluatedPharmacistName.shorterName;
            visitDetailsEdited[0].evaluatingManagerName = evaluatingManagerName.shorterName;

            if (visitDetails && evaluatedPharmacistName && evaluatingManagerName) {
                res.send(visitDetailsEdited[0]);
            } else {
                res.status(404).send({ message: "User Not Found" });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
);

visitRouter.post(
    "/addAVisit",
    expressAsyncHandler(async (req, res) => {
        const visit = new Visit({
            evaluatingManager: req.body.evaluatingManager,
            evaluatedPharmacy: req.body.evaluatedPharmacy,
            evaluatedPharmacistId: req.body.evaluatedPharmacistId,
            evaluationType: req.body.evaluationType,
            generalRemarks: req.body.generalRemarks,

            pharmacyHygienicMeasures: req.body.pharmacyHygienicMeasures,
            counterHygienicMeasures: req.body.counterHygienicMeasures,
            pricing: req.body.pricing,
            temperatureRegistration: req.body.temperatureRegistration,
            merchandizing: req.body.merchandizing,
            offersDisplay: req.body.offersDisplay,
            officialDocumentsOrganized: req.body.officialDocumentsOrganized,
            availabiltyFollowUp: req.body.availabiltyFollowUp,
            expiryFollowUp: req.body.expiryFollowUp,
            randomStockTake: req.body.randomStockTake,

            personalHygienicMeasures: req.body.personalHygienicMeasures,
            formalWear: req.body.formalWear,
            dataAwareness: req.body.dataAwareness,
            communicationSkills: req.body.communicationSkills,
            CustomerService: req.body.CustomerService,
        });

        try {
            const createdVisit = await visit.save();
            console.log(createdVisit);
            res.send({ message: "Visit Added successfully" });
        } catch (error) {
            res.send(error.message);
        }
    })
);

export default visitRouter;
