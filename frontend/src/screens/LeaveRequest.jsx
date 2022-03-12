import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LocationHeader from "../components/LocationHeader";
import MainHeader from "../components/MainHeader";
import SecondHeader from "../components/SecondHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Link, useHistory } from "react-router-dom";
import Axios from "../store/axios";
/*
import store from '../store/store.js'
import { useSelector, useDispatch } from 'react-redux'
import {SET_USER} from '../features/setUserSlice'
*/

function LeaveRequest() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [startLeaveDate, setStartLeaveDate] = useState(new Date());
    const [endLeaveDate, setEndLeaveDate] = useState(new Date());
    const [maximumReturnDate, setMaximumReturnDate] = useState(new Date());
    const [leaveApplyDate, setLeaveApplyDate] = useState(new Date());
    const [natureLeave, setNatureLeave] = useState("Annual Leave");
    const [maxDays, setMaxDays] = useState(30);
    const [realDays, setRealDays] = useState(0);
    const [leaveComment, setLeaveComment] = useState("");
    const [outsideChecked, setOutsideChecked] = useState(false);
    const [applyDateChangeErr, setApplyDateChangeErr] = useState(false);
    const [maxReturnDateChangeErr, setMaxReturnDateChangeErr] = useState(false);

    useEffect(() => {
        if (natureLeave === "Annual Leave") {
            setMaxDays(30);
        }
        if (natureLeave === "Emergency Leave") {
            setMaxDays(14);
        }
        if (natureLeave === "Hajj Leave") {
            setMaxDays(10);
        }
        if (natureLeave === "Omrah Leave") {
            setMaxDays(5);
        }
    }, [natureLeave]);

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    useEffect(() => {
        setRealDays(parseInt(Math.abs(startLeaveDate - endLeaveDate) / (1000 * 60 * 60 * 24) + 1));
        setMaximumReturnDate(addDays(startLeaveDate, maxDays));
        if (realDays > maxDays) {
            alert("Take Care, as the number of your leave days requested are more than the maximum number allowed, which may result in a Leave request rejection by the Administration.");
        }
    }, [startLeaveDate, endLeaveDate]);

    const submitLeaveRequest = (e) => {
        e.preventDefault();
        const newLeaveRequest = {
            requesterId: user._id,
            requesterName: user.employeeName,
            requesterShortestName: user.shortestName,
            requesterEmail: user.email,
            status: "Pending",
            dateRejoined: null,
            daysLate: "0",
            dateFrom: startLeaveDate.toLocaleDateString(),
            dateTo: endLeaveDate.toLocaleDateString(),
            natureLeave: natureLeave,
            realDaysLeave: realDays,
            maxDaysLeave: maxDays,
            applyDate: leaveApplyDate.toLocaleDateString(),
            outsideTravelling: outsideChecked,
            comment: leaveComment,
            dateRejoinRequest: undefined,
            dateRejoinRequestStatus: undefined,
        };

        console.log(newLeaveRequest);

        Axios.post("api/leaves/addALeave", newLeaveRequest).then((response) => {
            console.log(response);
            history.push("/");
        });
    };

    return (
        <div className="leaveRequest">
            <MainHeader />
            <SecondHeader />
            <LocationHeader location="Leave Request" />

            <div className="payrollHistory__container">
                <div className="payrollHistory__title">
                    <div className="payrollHistory__titleLeft">
                        <AssignmentIcon color="inherit" />
                        <h3 className="payrollHistory__titleText">Leave Request </h3>
                    </div>
                    <div className="payrollHistory__btnExpand">
                        <ExpandMoreIcon color="inherit" fontSize="large" />
                    </div>
                </div>

                <div className="leaveRequest__bodyContainer">
                    <div className="leaveRequest__bodyLeft">
                        <div className="leaveRequest__Line">
                            <p className="lr__title">Employee Name </p>
                            <textarea className="lr__detail lr__name" disabled value={user.shorterName} />
                            <textarea className="lr__detail lr__pk" disabled value={user.companyId} />
                        </div>
                        <div className="leaveRequest__Line">
                            <p className="lr__title">
                                Nature of Leave <span className="red">*</span>{" "}
                            </p>
                            <select className="lr__detail lr__selector" name="leaveTypes" value={natureLeave} onChange={(e) => setNatureLeave(e.target.value)}>
                                <option value="Annual Leave">Annual Leave</option>
                                <option value="Emergency Leave">Emergency</option>
                                <option value="Hajj Leave">Hajj Leave</option>
                                <option value="Omrah Leave">Omrah Leave</option>
                            </select>
                        </div>

                        <div className="leaveRequest__Line">
                            <p className="lr__title">Leave Factor </p>
                            <input className="lr__detail lr__leaveFactor" disabled value={`1 (full Day)`} />
                        </div>
                        <div className="leaveRequest__Line">
                            <p className="lr__title">
                                First Day of Leave <span className="red">*</span>{" "}
                            </p>
                            <div className="lr__detail">
                                {" "}
                                <DatePicker selected={startLeaveDate} onChange={(date) => setStartLeaveDate(date)} />{" "}
                            </div>
                        </div>
                        <div className="leaveRequest__Line">
                            <p className="lr__title">
                                Last Day of Leave <span className="red">*</span>{" "}
                            </p>
                            <div className="lr__detail">
                                {" "}
                                <DatePicker selected={endLeaveDate} onChange={(date) => setEndLeaveDate(date)} />{" "}
                            </div>
                        </div>
                        <div className="leaveRequest__Line">
                            <p className="lr__title">
                                Requested Days of Leave <span className="red">*</span>{" "}
                            </p>
                            <span className="lr__detail lr__numDays"> {realDays} </span>
                        </div>
                        <div className="leaveRequest__Line">
                            <p className="lr__title">
                                Maximum Return Date <span className="red">*</span>{" "}
                            </p>
                            <div className="lr__detail">
                                {" "}
                                <DatePicker selected={maximumReturnDate} onChange={() => setMaxReturnDateChangeErr(true)} />{" "}
                            </div>
                            {maxReturnDateChangeErr ? <span className="lr__detail lr__error "> This value is based on your leave nature and can't be changed </span> : ""}
                        </div>
                        <div className="leaveRequest__Line">
                            <p className="lr__title">
                                Maximum Days of Leave <span className="red">*</span>{" "}
                            </p>
                            <span className="lr__detail lr__numDays"> {maxDays} </span>
                        </div>
                    </div>

                    <div className="leaveRequest__bodyRight">
                        <div className="leaveRequest__Line">
                            <p className="lr__title">Comments (Reason) </p>
                            <input className="lr__detail lr__comment" value={leaveComment} onChange={(e) => setLeaveComment(e.target.value)} />
                        </div>
                        <div className="leaveRequest__Line">
                            <p className="lr__title">
                                {" "}
                                Leave Apply Date <span className="red">*</span>{" "}
                            </p>
                            <div className="lr__detail">
                                {" "}
                                <DatePicker selected={leaveApplyDate} onChange={() => setApplyDateChangeErr(true)} />{" "}
                            </div>
                            {applyDateChangeErr ? <span className="lr__detail lr__error ">This value can't be changed</span> : ""}
                        </div>

                        <div className="leaveRequest__Line">
                            <p className="lr__title lr__longQu">
                                {" "}
                                Are you travelling outside the country while on leave? <span className="red">*</span>{" "}
                            </p>
                            <div className="lr__detail">
                                {" "}
                                <input value={outsideChecked} type="checkbox" onClick={() => setOutsideChecked(!outsideChecked)} className="lr__checkBox"></input>{" "}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="leaveRequest__submitBtnDiv">
                    {" "}
                    <button className="leaveRequest__submitBtn" type="submit" onClick={(e) => submitLeaveRequest(e)}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LeaveRequest;
