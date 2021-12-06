import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LocationHeader from "../components/LocationHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import axios from "../store/axios";
import AccSecondHeader from "../components/AccSecondHeader";

function AccAllUsers() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [employees, setEmployees] = useState([]);
    const [activeEmployee, setActiveEmployee] = useState(null);
    const [activeGeneralDetails, setActiveGeneralDetails] = useState(true);
    const [contractType, setContractType] = useState("Pharmacist Old Contract");
    const [month, setMonth] = useState("06/01/2021");
    const [salaryOf, setSalaryOf] = useState("June-2021");
    const [generalRemarks, setGeneralRemarks] = useState("");
    const [basicPay, setBasicPay] = useState("3150");
    const [housingAllowance, setHousingAllowance] = useState("1276");
    const [transportAllowance, setTransportAllowance] = useState("200");
    const [fixedOverTime, setFixedOverTime] = useState("500");
    const [overTimeHours, setOverTimeHours] = useState("0");
    const [overTimeRate, setOverTimeRate] = useState("19.69");
    const [overTimeAllowance, setOverTimeAllowance] = useState("0");
    const [incentives, setIncentives] = useState("0");
    const [percentage, setPercentage] = useState("0");
    const [campaigns, setCampaigns] = useState("0");
    const [deductions, setDeductions] = useState("0");
    const [otherIncentives, setOtherIncentives] = useState("0");
    const [ticketsAllowance, setTicketsAllowance] = useState("0");
    const [netPay, setNetPay] = useState("5126.00");
    const [remarks, setRemarks] = useState("");
    const [myPayroll, setMyPayroll] = useState(null);

    const getUsersData = () => {
        axios.get("/api/users/").then((response) => {
            setEmployees(response.data);
        });
    };

    useEffect(() => {
        getUsersData();
    }, []);

    const handleContractType = (e) => {
        setContractType(e.target.value);
        if (e.target.value === "Pharmacist Old Contract") {
            setBasicPay("3150");
            setTransportAllowance("200");
            setFixedOverTime("500");
            setOverTimeRate("19.69");
        } else if (e.target.value === "Pharmacist New Contract") {
            setBasicPay("3500");
            setTransportAllowance("0");
            setFixedOverTime("0");
            setOverTimeRate("21.90");
        } else if (e.target.value === "Worker Contract") {
            setBasicPay("1250");
            setTransportAllowance("0");
            setHousingAllowance("0");
            setFixedOverTime("0");
            setOverTimeRate("7.50");
            setOtherIncentives("250");
        } else {
        }
    };

    const handleOverTimeHours = (e) => {
        if (e === "") {
            setOverTimeHours("0");
        } else {
            setOverTimeHours(e);
        }
        setOverTimeAllowance((e * overTimeRate).toString());
    };

    const refresher = () => {
        setOverTimeHours("0");
        setOverTimeAllowance("0");
        setIncentives("0");
        setPercentage("0");
        setCampaigns("0");
        setDeductions("0");
        setOtherIncentives("0");
        setTicketsAllowance("0");
        setRemarks("");
    };

    const addNewSalary = (employee) => {
        const salaryDetails = {
            userId: employee._id,
            userName: employee.shorterName,
            month: new Date(month),
            salaryOf: salaryOf,
            basicPay: parseFloat(basicPay),
            housingAllowance: parseFloat(housingAllowance),
            transportAllowance: parseFloat(transportAllowance),
            fixedOverTime: parseFloat(fixedOverTime),
            overTimeHours: parseFloat(overTimeHours),
            overTimeAllowance: parseFloat(overTimeAllowance),
            overTimeRate: parseFloat(overTimeRate),
            incentives: parseFloat(incentives),
            percentage: parseFloat(percentage),
            campaigns: parseFloat(campaigns),
            deductions: parseFloat(deductions),
            netPay: parseFloat(basicPay) + parseFloat(housingAllowance) + parseFloat(transportAllowance) + parseFloat(fixedOverTime) + parseFloat(incentives) + parseFloat(percentage) + parseFloat(campaigns) + parseFloat(ticketsAllowance) + parseFloat(otherIncentives) + parseFloat(overTimeAllowance) - parseFloat(deductions),
            otherIncentives: parseFloat(otherIncentives),
            ticketsAllowance: parseFloat(ticketsAllowance),
            generalRemarks: generalRemarks,
            remarks: remarks,
        };

        console.log(salaryDetails);
        setMyPayroll(salaryDetails);

        axios.post("/api/payrolls/addAPayroll", salaryDetails).then((response) => {
            console.log(response.data);
            setActiveEmployee(activeEmployee + 1);
            refresher();
        });
    };

    return (
        <div className="accAllUsers">
            <div className="dashHome__mainHeader">Dashboard</div>
            <AccSecondHeader />
            <LocationHeader location="All Employees" />

            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer accAllUsers__generalDetails">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title groupsGeneralDetails">
                            <span className="material-icons ">groups</span>
                            <h3 className="wcfc__titleText"> General Details </h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={() => setActiveGeneralDetails(!activeGeneralDetails)}>
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>
                    {activeGeneralDetails ? (
                        <div className="wcfc__bodyDiv">
                            <div className="accAllUsers__left">
                                <div className="accAllUsers__line">
                                    <p className="accAllUsers__lineTitle">Month</p>
                                    <select className="accAllUsers__lineDetail alu__selector" name="Contract Type" value={month} onChange={(e) => setMonth(e.target.value)}>
                                        <option value="01/01/2022">01/01/2022</option>
                                        <option value="02/01/2022">02/01/2022</option>
                                        <option value="03/01/2022">03/01/2022</option>
                                        <option value="04/01/2022">04/01/2022</option>
                                        <option value="05/01/2022">05/01/2022</option>
                                        <option value="06/01/2022">06/01/2022</option>
                                        <option value="07/01/2022">07/01/2022</option>
                                        <option value="08/01/2022">08/01/2022</option>
                                        <option value="09/01/2022">09/01/2022</option>
                                        <option value="10/01/2022">10/01/2022</option>
                                        <option value="11/01/2022">11/01/2022</option>
                                        <option value="12/01/2022">12/01/2022</option>
                                    </select>
                                </div>
                            </div>
                            <div className="accAllUsers__right">
                                <div className="accAllUsers__line">
                                    <p className="accAllUsers__lineTitle">Salary Of</p>
                                    <select className="accAllUsers__lineDetail alu__selector" name="Contract Type" value={salaryOf} onChange={(e) => setSalaryOf(e.target.value)}>
                                        <option value="January-2021">January-2022</option>
                                        <option value="February-2021">February-2022</option>
                                        <option value="March-2021">March-2022</option>
                                        <option value="April-2021">April-2022</option>
                                        <option value="May-2021">May-2022</option>
                                        <option value="June-2021">June-2022</option>
                                        <option value="July-2022">July-2022</option>
                                        <option value="August-2022">August-2022</option>
                                        <option value="September-2022">September-2022</option>
                                        <option value="October-2022">July-2022</option>
                                        <option value="November-2022">November-2022</option>
                                        <option value="December-2022">December-2022</option>
                                    </select>
                                </div>
                            </div>
                            <div className="accAllUsers__leftRight">
                                <div className="accAllUsers__line">
                                    <p className="accAllUsers__lineTitle">General Remarks</p>
                                    <textarea className="accAllUsers__lineDetail alu__remarks" value={generalRemarks} onChange={(e) => setGeneralRemarks(e.target.value)} cols="30" rows="1"></textarea>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            {employees
                .filter((employee) => !employee.isAdmin && !employee.isAccountant)
                .map((employee, index) => (
                    <div className="pageCentered__body" key={index}>
                        <div className="whiteCenteredFlexibleContainer accAllUsers__smaller">
                            <div className="wcfc__titleDiv ">
                                <div className="wcfc__title ">
                                    <span className="material-icons">person_outline</span>
                                    <h3 className="wcfc__titleText"> {employee.shorterName} </h3>
                                </div>
                                <div className="wcfc__btnExpand" onClick={() => setActiveEmployee(index)}>
                                    <ExpandMoreIcon color="inherit" fontSize="large" />
                                </div>
                            </div>
                            {activeEmployee == `${index}` ? (
                                <div className="wcfc__bodyDiv">
                                    <div className="accAllUsers__left">
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Contract</p>
                                            <select className="accAllUsers__lineDetail alu__selector" name="Contract Type" value={contractType} onChange={(e) => handleContractType(e)}>
                                                <option value="Pharmacist Old Contract">Pharmacist Old Contract</option>
                                                <option value="Pharmacist New Contract">Pharmacist New Contract</option>
                                                <option value="Worker Contract">Worker Contract</option>
                                            </select>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Basic Pay</p>
                                            <select className="accAllUsers__lineDetail alu__selector" name="basicPay" value={basicPay} onChange={(e) => setBasicPay(e.target.value)}>
                                                <option value={"3150"}>3150</option>
                                                <option value={"3500"}>3500</option>
                                                <option value={"1250"}>1250</option>
                                            </select>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Housing Allowance</p>
                                            <select className="accAllUsers__lineDetail alu__selector" name="housingAllowance" value={housingAllowance} onChange={(e) => setHousingAllowance(parseInt(e.target.value))}>
                                                <option value={"1276"}>1276</option>
                                                <option value={"1500"}>1500</option>
                                                <option value={"0"}>0</option>
                                            </select>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Transport Allowance</p>
                                            <select className="accAllUsers__lineDetail alu__selector" name="transportAllowance" value={transportAllowance} onChange={(e) => setTransportAllowance(parseInt(e.target.value))}>
                                                <option value={"200"}>200</option>
                                                <option value={"0"}>0</option>
                                            </select>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Fixed OverTime</p>
                                            <select className="accAllUsers__lineDetail alu__selector" name="fixedOverTime" value={fixedOverTime} onChange={(e) => setFixedOverTime(parseInt(e.target.value))}>
                                                <option value={"500"}>500</option>
                                                <option value={"0"}>0</option>
                                            </select>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">OverTime Rate</p>
                                            <span className="accAllUsers__lineDetail alu__span" value={overTimeRate} onChange={(e) => setOverTimeRate(e.target.value)}>
                                                {overTimeRate} SAR
                                            </span>
                                        </div>
                                    </div>
                                    <div className="accAllUsers__right">
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Incentives</p>
                                            <textarea
                                                className="accAllUsers__lineDetail"
                                                value={incentives}
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        setIncentives("0");
                                                    } else {
                                                        setIncentives(e.target.value);
                                                    }
                                                }}
                                                cols="30"
                                                rows="1"
                                            ></textarea>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Percentage</p>
                                            <textarea
                                                className="accAllUsers__lineDetail"
                                                value={percentage}
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        setPercentage("0");
                                                    } else {
                                                        setPercentage(e.target.value);
                                                    }
                                                }}
                                                cols="30"
                                                rows="1"
                                            ></textarea>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Campaigns</p>
                                            <textarea
                                                className="accAllUsers__lineDetail"
                                                value={campaigns}
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        setCampaigns("0");
                                                    } else {
                                                        setCampaigns(e.target.value);
                                                    }
                                                }}
                                                cols="30"
                                                rows="1"
                                            ></textarea>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Deductions</p>
                                            <textarea
                                                className="accAllUsers__lineDetail"
                                                value={deductions}
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        setDeductions("0");
                                                    } else {
                                                        setDeductions(e.target.value);
                                                    }
                                                }}
                                                cols="30"
                                                rows="1"
                                            ></textarea>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Tickets Allowance</p>
                                            <textarea
                                                className="accAllUsers__lineDetail"
                                                value={ticketsAllowance}
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        setTicketsAllowance("0");
                                                    } else {
                                                        setTicketsAllowance(e.target.value);
                                                    }
                                                }}
                                                cols="30"
                                                rows="1"
                                            ></textarea>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Other Incentives</p>
                                            <textarea
                                                className="accAllUsers__lineDetail"
                                                value={otherIncentives}
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        setOtherIncentives("0");
                                                    } else {
                                                        setOtherIncentives(e.target.value);
                                                    }
                                                }}
                                                cols="30"
                                                rows="1"
                                            ></textarea>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">OverTime Hours</p>
                                            <textarea className="accAllUsers__lineDetail" value={overTimeHours} onChange={(e) => handleOverTimeHours(e.target.value)} cols="30" rows="1"></textarea>
                                        </div>

                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">OverTime Allowance</p>
                                            <span className="accAllUsers__lineDetail alu__span" value={overTimeAllowance} onChange={(e) => setOverTimeAllowance(e.target.value)}>
                                                {parseFloat(overTimeAllowance).toFixed(2)} SAR
                                            </span>
                                        </div>
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Net Pay</p>
                                            <span className="accAllUsers__lineDetail alu__span red bold">
                                                {(parseFloat(basicPay) + parseFloat(housingAllowance) + parseFloat(transportAllowance) + parseFloat(fixedOverTime) + parseFloat(incentives) + parseFloat(percentage) + parseFloat(campaigns) + parseFloat(ticketsAllowance) + parseFloat(otherIncentives) + parseFloat(overTimeAllowance) - parseFloat(deductions)).toFixed(2)} SAR
                                            </span>
                                        </div>
                                    </div>
                                    <div className="accAllUsers__leftRight">
                                        <div className="accAllUsers__line">
                                            <p className="accAllUsers__lineTitle">Remarks</p>
                                            <textarea className="accAllUsers__lineDetail alu__remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} cols="80" rows="1"></textarea>
                                        </div>
                                    </div>
                                    <div className="accAllUsers__btnDiv">
                                        <button className="accAllUsers__buttonSubmit" onClick={() => addNewSalary(employee)}>
                                            Add a New Salary
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default AccAllUsers;

/*

{
        slipUid:'88755oijnhg',
        month:'07/01/2021',
        salaryOf:'June 2021',
        basic:3150,
        housingAllowance:1265,
        transportAllowance:200,
        totalAllowance:2050,
        fixedOverTime:500,
        overTimeHours:20,
        overTime:1000,
        hourlyRate:19.69,
        incentive:1240,
        percentage:890,
        campaigns:150,
        deductions:0,
        netPay:7500,
        otherIncentives:0,
        ticketsAllowance:0,
        remarks:`Campaign, overTime, Other remarks.`,
    },

*/
