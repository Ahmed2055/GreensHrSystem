import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {

      console.log("request to get all users");
      const users = await User.find({});
      res.send(users);
  })
);

userRouter.post(
    "/signin",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body);
        console.log("request to sign in again");

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isAccountant: user.isAccountant,
                    employeeName: user.employeeName,
                    shorterName: user.shorterName,
                    shortestName: user.shortestName,
                    currentPharmacy: user.currentPharmacy,
                    firstName: user.firstName,
                    secondName: user.secondName,
                    lastName: user.lastName,
                    companyId: user.companyId,
                    gender: user.gender,
                    nationality: user.nationality,
                    position: user.position,
                    birthDate: user.birthDate,
                    joiningDate: user.joiningDate,
                    employmentType: user.employmentType,
                    vaccinated: user.vaccinated,
                    status: user.status,
                    telNo: user.telNo,
                    propationPeriod: user.propationPeriod,
                    SalaryTransferMode: user.SalaryTransferMode,
                    bankAccountNo: user.bankAccountNo,
                    bankName: user.bankName,
                    contacts: user.contacts,
                    token: generateToken(user),
                });

                return;
            }
        }
        res.status(401).send({ message: "Invalid email or password" });
    })
);

userRouter.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
        const user = new User({

            employeeName: req.body.employeeName,
            shorterName: req.body.shorterName,
            shortestName: req.body.shortestName,
            currentPharmacy:  req.body.currentPharmacy, 
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            lastName: req.body.lastName,
            companyId: req.body.companyId,
            gender: req.body.gender,
            nationality: req.body.nationality,
            position: req.body.position,
            birthDate: req.body.birthDate,
            joiningDate: req.body.joiningDate,
            email: req.body.email,
            telNo: req.body.telNo,
            contacts: req.body.contacts,
            employmentType: req.body.employmentType,
            paySlips: req.body.paySlips,
            leaves: req.body.leaves,
            SalaryTransferMode: req.body.SalaryTransferMode,
            bankAccountNo: req.body.bankAccountNo,
            bankName: req.body.bankName,
            propationPeriod: req.body.propationPeriod,
            vaccinated: req.body.vaccinated,
            vaccinationDetails: req.body.vaccinationDetails,
            status: req.body.status,
            isAdmin: req.body.isAdmin,
            isAccountant: req.body.isAccountant,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isAccountant: user.isAccountant,
            employeeName: user.employeeName,
            shorterName: user.shorterName,
            shortestName: user.shortestName,
            currentPharmacy: user.currentPharmacy,
            firstName: user.firstName,
            secondName: user.secondName,
            lastName: user.lastName,
            companyId: user.companyId,
            gender: user.gender,
            nationality: user.nationality,
            position: user.position,
            birthDate: user.birthDate,
            joiningDate: user.joiningDate,
            employmentType: user.employmentType,
            vaccinated: user.vaccinated,
            status: user.status,
            telNo: user.telNo,
            propationPeriod: user.propationPeriod,
            SalaryTransferMode: user.SalaryTransferMode,
            bankAccountNo: user.bankAccountNo,
            bankName: user.bankName,
            token: generateToken(createdUser),
        });
    })
);

userRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);

userRouter.delete(
    "admin/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.email === "a.teaima@greenscorners.com") {
                res.status(400).send({ message: "Can Not Delete Admin User" });
                return;
            }
            const deleteUser = await user.remove();
            res.send({ message: "User Deleted", user: deleteUser });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);



userRouter.put(
    "/admin/editUserDetails/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAccountant = Boolean(req.body.isAccountant);
            user.isAdmin = Boolean(req.body.isAdmin);

            const updatedUser = await user.save();
            res.send({ message: "User Updated", user: updatedUser });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);

userRouter.post(
    "/editUserDetails/:id",
    expressAsyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                user.contacts = req.body.contacts || user.contacts;
                user.vaccinated = req.body.vaccinated || user.vaccinated;
                user.vaccinationDetails = req.body.vaccinationDetails || user.vaccinationDetails;
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                isAccountant: updatedUser.isAccountant,
                employeeName: updatedUser.employeeName,
                shorterName: updatedUser.shorterName,
                shortestName: updatedUser.shortestName,
                currentPharmacy: updatedUser.currentPharmacy,
                firstName: updatedUser.firstName,
                secondName: updatedUser.secondName,
                lastName: updatedUser.lastName,
                companyId: updatedUser.companyId,
                gender: updatedUser.gender,
                nationality: updatedUser.nationality,
                position: updatedUser.position,
                birthDate: updatedUser.birthDate,
                joiningDate: updatedUser.joiningDate,
                employmentType: updatedUser.employmentType,
                vaccinated: updatedUser.vaccinated,
                vaccinationDetails: updatedUser.vaccinationDetails,
                status: updatedUser.status,
                telNo: updatedUser.telNo,
                propationPeriod: updatedUser.propationPeriod,
                SalaryTransferMode: updatedUser.SalaryTransferMode,
                bankAccountNo: updatedUser.bankAccountNo,
                bankName: updatedUser.bankName,
                contacts: updatedUser.contacts,
                token: generateToken(updatedUser),
            });
            console.log("user details Updated");
        } catch (error) {
            res.status(401).send({ message: "User Not Found" });
        }
    })
);

export default userRouter;
