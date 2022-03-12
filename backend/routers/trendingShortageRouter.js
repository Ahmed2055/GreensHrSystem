import express from "express";
import expressAsyncHandler from "express-async-handler";
import TrendingShortage from "../models/trendingShortageModel.js";

const trendingShortageRouter = express.Router();

trendingShortageRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        try {
            const trendingShortages = await TrendingShortage.find({});
            res.send(trendingShortages);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
);

trendingShortageRouter.get(
    "/latest",
    expressAsyncHandler(async (req, res) => {
        try {
            const trendingShortages = await TrendingShortage.find({});
            res.send(trendingShortages);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
);

trendingShortageRouter.post(
    "/addATrendingShortage",
    expressAsyncHandler(async (req, res) => {
        const trendingShortage = new TrendingShortage({
            shortageUPC: req.body.shortageUPC,
            shortageName: req.body.shortageName,
            shortagePicLink: req.body.shortagePicLink,
            shortageRegisterers: req.body.shortageRegisterers,
            shortagePrice: req.body.shortagePrice,
        });

        try {
            const createdTrendingShortage = await trendingShortage.save();
            console.log(createdTrendingShortage);
            res.send({ message: "TrendingShortage Added successfully" });
        } catch (error) {
            res.send(error.message);
        }
    })
);

trendingShortageRouter.post(
    "/trendingShortageUpdate/:tid",
    expressAsyncHandler(async (req, res) => {
        try {
            const trendingShortageId = req.params.tid;
            console.log(trendingShortageId);

            const trendingShortage = await TrendingShortage.findById(req.params.tid);
            if (trendingShortage) {
                trendingShortage.shortageRegisterers = req.body.shortageRegisterers || trendingShortage.shortageRegisterers;
            }

            const updatedTrendingShortage = await trendingShortage.save();

            res.send(updatedTrendingShortage);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
);

export default trendingShortageRouter;
