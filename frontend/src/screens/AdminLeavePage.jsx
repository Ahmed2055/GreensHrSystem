import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LocationHeader from "../components/LocationHeader";
import MainHeader from "../components/MainHeader";
import SecondHeader from "../components/SecondHeader";
import DashSecondHeader from "../components/DashSecondHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import LeaveComponent from "../components/LeaveComponent";
import Axios from "../store/axios";

function AdminLeavePage() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    let match = useRouteMatch();

    const [realLeaveId, setRealLeaveId] = useState(match.params.leaveId);
    const [currentLeave, setCurrentLeave] = useState({ dateTo: new Date(), dateFrom: new Date(), dateApply: new Date().toLocaleString(), dateRejoined: new Date() });
    const [suggestedRejoinDate, setSuggestedRejoinDate] = useState(new Date());

    const getCurrentLeaveDetails = () => {
        Axios.get(`/api/leaves/leaveDetails/${realLeaveId}`).then((response) => {
            console.log(response.data);
            setCurrentLeave(response.data);
        });
    };

    useEffect(() => {
        getCurrentLeaveDetails();
    }, []);

    const approveLeaveRequest = (e) =>{
        e.preventDefault();
        const updatedLeave = currentLeave;
        currentLeave.status = "Approved";

        Axios.post(`/api/leaves/leaveUpdate/${realLeaveId}`, updatedLeave).then((response) => {
            console.log(response.data);
            setCurrentLeave(response.data);
        });

    }

    const rejectLeaveRequest = (e) =>{
        e.preventDefault();
        const updatedLeave = currentLeave;
        currentLeave.status = "Rejected";

        Axios.post(`/api/leaves/leaveUpdate/${realLeaveId}`, updatedLeave).then((response) => {
            console.log(response.data);
            setCurrentLeave(response.data);
        });

    }

    const approveReturnRequest = (e) => {
        e.preventDefault();
        const updatedLeave = currentLeave;
        currentLeave.dateRejoinRequestStatus = "Approved";
        updatedLeave.dateRejoined = new Date(currentLeave.dateRejoinRequest);

        Axios.post(`/api/leaves/leaveUpdate/${realLeaveId}`, updatedLeave).then((response) => {
            console.log(response.data);
            setCurrentLeave(response.data);
        });

        //console.log('updatedLeave', updatedLeave)
    };

    const rejectReturnRequest = (e) => {
        e.preventDefault();
        const updatedLeave = currentLeave;
        updatedLeave.dateRejoinRequestStatus = "Rejected";

        Axios.post(`/api/leaves/leaveUpdate/${realLeaveId}`, updatedLeave).then((response) => {
            console.log(response.data);
            setCurrentLeave(response.data);
        });

        //console.log('updatedLeave', updatedLeave)
    };

    return (
        <div className="leavePage">
            <MainHeader />
            <DashSecondHeader />
            <LocationHeader location="Leave Details" />

            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title ">
                            <span className="material-icons">badge</span>
                            <h3 className="wcfc__titleText">Leave Details</h3>
                        </div>
                        <div className="wcfc__btnExpand">
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>

                    <div className="wcfc__bodyDiv">
                        <div className="leaveComponent">
                            <div className="leaveC__left">
                                <div className="leaveC__line">
                                    <p className="leaveC__title">Status</p>
                                    <span className={`leaveC__text  ${currentLeave.status === "Pending" ? "mainDarkColor" : ""} ${currentLeave.status === "Approved" ? "green" : ""} ${currentLeave.status === "Rejected" ? "red" : ""} `}>{currentLeave.status}</span>
                                </div>
                                <div className="leaveC__line">
                                    <p className="leaveC__title">Nature Of Leave</p>
                                    <span className="leaveC__text">{currentLeave.natureLeave} </span>
                                </div>
                                <div className="leaveC__line">
                                    <p className="leaveC__title">Travelling Outside?</p>
                                    <span className="leaveC__text">{currentLeave.outsideTravelling ? "Yes" : "No"} </span>
                                </div>
                            </div>
                            <div className="leaveC__right">
                                <div className="leaveC__line">
                                    <p className="leaveC__title">From Date</p>
                                    <span className="leaveC__text">{currentLeave.dateFrom.toString()}</span>
                                </div>
                                <div className="leaveC__line">
                                    <p className="leaveC__title">To Date</p>
                                    <span className="leaveC__text">{currentLeave.dateTo.toString()}</span>
                                </div>
                                <div className="leaveC__line">
                                    <p className="leaveC__title">No of Days</p>
                                    <span className="leaveC__text">{currentLeave.realDaysLeave}</span>
                                </div>
                                <div className="leaveC__line">
                                    <p className="leaveC__title">Date Applied</p>
                                    <span className="leaveC__text">{currentLeave.applyDate}</span>
                                </div>
                            </div>
                            <div className="leaveC__line">
                                <p className="leaveC__title">Comment (reason)</p>
                                <span className="leaveC__text">{currentLeave.comment}</span>
                            </div>
                            {currentLeave.status ==='Pending'?
                            <div className="leaveC__line justifyEvenly">
                                <button className='wcfc__btnSubmit greenBackGround' onClick={(e)=>approveLeaveRequest(e)} >Approve</button>
                                <button className='wcfc__btnSubmit redBackGround' onClick={(e)=>rejectLeaveRequest(e)} >Reject</button>
                            </div>
                            :''}
                        </div>
                    </div>
                </div>

                {currentLeave.status === "Approved" ? (
                    <div className="whiteCenteredFlexibleContainer">
                        <div className="wcfc__titleDiv ">
                            <div className="wcfc__title ">
                                <span className="material-icons">badge</span>
                                <h3 className="wcfc__titleText">Leave Rejoin Details</h3>
                            </div>
                            <div className="wcfc__btnExpand">
                                <ExpandMoreIcon color="inherit" fontSize="large" />
                            </div>
                        </div>

                        <div className="wcfc__bodyDiv">
                            <div className="leaveComponent">
                                <div className="leaveC__line">
                                    <p className="leaveC__title">Rejoined?</p>
                                    <span className="leaveC__text">{currentLeave.dateRejoined === null ? `Rejoin hasn't been ${currentLeave.dateRejoinRequest === undefined ? "Requested" : "Approved"} yet` : "Yes"}</span>
                                </div>
                                {currentLeave.dateRejoinRequest !== undefined ? (
                                    <div className="leaveC__line">
                                        <p className="leaveC__title">Suggested Rejoin Date</p>
                                        <span className="leaveC__text">
                                            {currentLeave.dateRejoinRequest} {currentLeave.dateRejoinRequestStatus}{" "}
                                        </span>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {currentLeave.dateRejoinRequestStatus !== "Approved" && currentLeave.dateRejoinRequest !== undefined ? (
                                    <div className="leaveC__line justifyEvenly">
                                        <button className="wcfc__btnSubmit greenBackGround" onClick={(e) => approveReturnRequest(e)}>
                                            Approve
                                        </button>
                                        <button className="wcfc__btnSubmit redBackGround" onClick={(e) => rejectReturnRequest(e)}>
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {currentLeave.dateRejoined === null ? (
                                    <div></div>
                                ) : (
                                    <div className="leaveC__line">
                                        <p className="leaveC__title">Date of Rejoin</p>
                                        <span className="leaveC__text">{new Date(currentLeave.dateRejoined).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default AdminLeavePage;
