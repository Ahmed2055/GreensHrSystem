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

function LeavePage() {
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

    const handleRejoinRequest = (e) => {
        e.preventDefault();
        const editedLeave = currentLeave;

        editedLeave.dateRejoinRequest = suggestedRejoinDate.toLocaleDateString();
        editedLeave.dateRejoinRequestStatus = "Pending";

        Axios.post(`/api/leaves/leaveUpdate/${realLeaveId}`, editedLeave).then((response) => {
            console.log(response.data);
            setCurrentLeave(response.data);
        });
    };

    const cancelLeaveRequest = (e) => {
        e.preventDefault();
        const canceledLeave = currentLeave;
        canceledLeave.status = "Cancelled";

        Axios.post(`/api/leaves/leaveUpdate/${realLeaveId}`, canceledLeave).then((response) => {
            console.log(response.data);
            setCurrentLeave(response.data);
        });
    };

    return (
        <div className="leavePage">
            <MainHeader />
            {!user.isAdmin && <SecondHeader />}
            {user.isAdmin && <DashSecondHeader />}
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

                            <div className="leaveC__line">
                                {currentLeave.status === "Pending" && (
                                    <button className=" leavePage__btnSubmit " onClick={(e) => cancelLeaveRequest(e)}>
                                        Cancel Requested Leave
                                    </button>
                                )}
                            </div>
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

                                {currentLeave.dateRejoined === null ? (
                                    <div></div>
                                ) : (
                                    <div className="leaveC__line">
                                        <p className="leaveC__title">Date of Rejoin</p>
                                        <span className="leaveC__text">{new Date(currentLeave.dateRejoined).toLocaleDateString()}</span>
                                    </div>
                                )}
                                {currentLeave.dateRejoined === null ? (
                                    <div>
                                        {currentLeave.dateRejoinRequest === undefined ? (
                                            <div>
                                                <div className="leaveC__line">
                                                    <p className="leaveC__title">Choose your Rejoin Date</p>
                                                    <span className="leaveC__text">
                                                        <DatePicker selected={suggestedRejoinDate} onChange={(date) => setSuggestedRejoinDate(date)} />
                                                    </span>
                                                </div>
                                                <button className=" leavePage__btnSubmit " onClick={(e) => handleRejoinRequest(e)}>
                                                    Request a Rejoin
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="leaveC__line">
                                                    <p className="leaveC__title">Suggested Rejoin Date</p>
                                                    <span className="leaveC__text">{currentLeave.dateRejoinRequest}</span>
                                                </div>
                                                <div className="leaveC__line">
                                                    <p className="leaveC__title">Edit your Rejoin Date</p>
                                                    <span className="leaveC__text">
                                                        <DatePicker selected={suggestedRejoinDate} onChange={(date) => setSuggestedRejoinDate(date)} />
                                                    </span>
                                                </div>
                                                <button className=" leavePage__btnSubmit " onClick={(e) => handleRejoinRequest(e)}>
                                                    Edit Rejoin Request
                                                </button>
                                            </div>
                                        )}
                                    </div>
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

export default LeavePage;
