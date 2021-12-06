import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import companyLogo from "../pics/companyLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import axios from "../store/axios";

function SlipPage() {
    const user = useSelector(selectUser);
    const history = useHistory();
    let match = useRouteMatch();

    const [realSlipId, setRealSlipId] = useState(match.params.slipId);
    const [currentSlip, setCurrentSlip] = useState({
        slipUid: "",
        month: "",
        salaryOf: "",
        basicPay: "3150",
        housingAllowance: "1265",
        telAllowance: "150",
        transportAllowance: "200",
        totalAllowance: "2050",
        fixedOverTime: "500",
        overTimeHours: "20",
        overTimeAllowance: "1000",
        overTimeRate: "19.69",
        incentives: "1240",
        percentage: "890",
        campaigns: "150",
        deductions: "50",
        netPay: "7500",
        otherIncentives: "230",
        ticketsAllowance: "0",
        remarks: `Campaign, overTime, Other remarks.`,
        generalRemarks: `General generalRemarks.`,
    });

    const loadCurrentSlipDetails = () => {
        axios.get(`/api/payrolls/payrollDetails/${realSlipId}`).then((response) => {
            setCurrentSlip(response.data);
            console.log(response.data);
        });
    };

    useEffect(() => {
        loadCurrentSlipDetails();
    }, []);

    return (
        <div className="slipPage">
            <div className="slipPage__centeredContainer">
                <div className="slipPage__header">
                    <img src={companyLogo} alt="companyLogo" className="slipPage__headerLogo" />
                    <div className="slipPage__headerTexts" dir="rtl">
                        <p className="slipPage__headerText">Head Office</p>
                        <p className="slipPage__headerText">|Al Sulay| Ibn Al Amid Road |</p>
                        <p className="slipPage__headerText">Riyadh | Kingdom of Saudi Arabia</p>
                        <p className="slipPage__headerText">P.O. Box 647646 Riyadh 11352</p>
                        <p className="slipPage__headerText">Tel +96611467875 </p>
                        <p className="slipPage__headerText">Fax +96611467875</p>
                    </div>
                </div>

                <div className="slipPage__titleDiv">
                    <h3 className="slipPage__title">PRIVATE & CONFIDENTIAL</h3>
                    <h3 className="slipPage__title">PAY STATEMENT</h3>
                </div>

                <div className="slipPage__bodyContainer">
                    <div className="slipPage__containerTop spct__first">
                        <h3 className="slipPage__TopTitle ">{currentSlip.salaryOf} - PAY SLIP</h3>
                    </div>
                    <div className="slipPage__containerBottom spcb__first">
                        <div className="spcb__leftDiv">
                            <div className="spcb__line">
                                <p className="spcb__lineLeft">Employee Name</p>
                                <p className="spcb__lineRight">{user.shorterName}</p>
                            </div>
                            <div className="spcb__line">
                                <p className="spcb__lineLeft">Employee ID</p>
                                <p className="spcb__lineRight">{user.companyId}</p>
                            </div>
                        </div>
                        <div className="spcb__RightDiv">
                            <div className="spcb__line">
                                <p className="spcb__lineLeft">Position</p>
                                <p className="spcb__lineRight">{user.position}</p>
                            </div>
                            <div className="spcb__line">
                                <p className="spcb__lineLeft">Date of Joining</p>
                                <p className="spcb__lineRight">{new Date(user.joiningDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {currentSlip.netPay ? (
                    <>
                        <div className="slipPage__bodyContainer">
                            <div className="slipPage__containerTop spct__second">
                                <h3 className="slipPage__TopTitle underlined"> EARNINGS:</h3>
                                <h3 className="slipPage__TopTitle spct__smaller">CURRENCY - SAR</h3>
                            </div>
                            <div className="slipPage__containerBottom spcb__container">
                                <table className="spcb__second__table">
                                    <thead className="spcb__second__thead">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td pdHead">Description</td>
                                            <td className="spcb__second__td pdHead">Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody className="spcb__second__tbody">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td "></td>
                                            <td className="spcb__second__td "></td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Basic Salary</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.basicPay).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Commision</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.incentives).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Fixed Overtime</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.fixedOverTime).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Housing Allowance</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.housingAllowance).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Percentage</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.percentage).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Transport Allowance </td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.transportAllowance).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Campaign Incentives</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.campaigns).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Overtime </td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.overTimeAllowance).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Tickets </td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.ticketsAllowance).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">Deductions </td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.deductions).toFixed(2)}</td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td "></td>
                                            <td className="spcb__second__td "></td>
                                        </tr>
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td "></td>
                                            <td className="spcb__second__td "></td>
                                        </tr>
                                    </tbody>
                                    <thead className="spcb__second__thead">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td pdHead ">Gross Total</td>
                                            <td className="spcb__second__td pdHead verticallyBordered">{parseFloat(currentSlip.netPay).toFixed(2)}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        <div className="slipPage__bodyContainer">
                            <div className="slipPage__containerTop spct__second">
                                <h3 className="slipPage__TopTitle underlined"> OVERTIME:</h3>
                                <h3 className="slipPage__TopTitle spct__smaller">Extra Hour of Work for an Hour and a Half of Pay</h3>
                            </div>
                            <div className="slipPage__containerBottom spcb__container">
                                <table className="spcb__second__table">
                                    <thead className="spcb__second__thead">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td pdHead">Overtime</td>
                                            <td className="spcb__second__td pdHead">Hours</td>
                                            <td className="spcb__second__td pdHead">Rate</td>
                                            <td className="spcb__second__td pdHead">Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody className="spcb__second__tbody">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">1.50</td>
                                            <td className="spcb__second__td ">{currentSlip.overTimeHours}</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.overTimeRate).toFixed(2)}</td>
                                            <td className="spcb__second__td ">{parseFloat(currentSlip.overTimeAllowance).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                    <thead className="spcb__second__thead">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td pdHead ">Total Overtime</td>
                                            <td className="spcb__second__td pdHead verticallyBordered">{currentSlip.overTimeHours}</td>
                                            <td className="spcb__second__td pdHead"></td>
                                            <td className="spcb__second__td pdHead verticallyBordered">{parseFloat(currentSlip.overTimeAllowance).toFixed(2)}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        <div className="slipPage__bodyContainer">
                            <div className="slipPage__containerTop spcb__container spct__third">
                                <h3 className="slipPage__TopTitle underlined">NET SALARY :</h3>
                                <h3 className="slipPage__TopTitle">{parseFloat(currentSlip.netPay).toFixed(2)} SAR</h3>
                            </div>
                            <div className="slipPage__containerBottom spcb__container">
                                <div className="spcb__remarksDiv">
                                    <p className="spcb__remarksTitle">Remarks</p>
                                    <span className="spcb__remarksText">
                                        {currentSlip.generalRemarks}, {currentSlip.remarks}.
                                    </span>
                                </div>
                                <h3 className="spcb__tableTitle">Payment Details:</h3>
                                <table className="spcb__second__table">
                                    <thead className="spcb__second__thead">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td pdHead">Bank Name</td>
                                            <td className="spcb__second__td pdHead">Bank Code</td>
                                            <td className="spcb__second__td pdHead">Account No.</td>
                                            <td className="spcb__second__td pdHead"></td>
                                        </tr>
                                    </thead>
                                    <tbody className="spcb__second__tbody">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td ">{user.bankName}</td>
                                            <td className="spcb__second__td ">
                                                {user.bankName === "Alinmaa Bank" ? "Inmaa" : ""}
                                                {user.bankName === "Al Bilad Bank" ? "Bilad" : ""}
                                            </td>
                                            <td className="spcb__second__td ">{user.bankAccountNo}</td>
                                            <td className="spcb__second__td "></td>
                                        </tr>
                                    </tbody>
                                    <thead className="spcb__second__thead">
                                        <tr className="spcb__second__tr">
                                            <td className="spcb__second__td pdHead "></td>
                                            <td className="spcb__second__td pdHead"></td>
                                            <td className="spcb__second__td pdHead">Payment Total</td>
                                            <td className="spcb__second__td pdHead verticallyBordered">{parseFloat(currentSlip.netPay).toFixed(2)}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
            
        </div>
    );
}

export default SlipPage;
