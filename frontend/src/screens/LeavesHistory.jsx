import React, { useState, useEffect, useReducer } from "react";
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
import LeaveComponent from "../components/LeaveComponent";
import Axios from '../store/axios';

function LeavesHistory() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [state, setstate] = useState({ userLeaves: [] });


    const getLeavesData = () => {
        var myLeaves = [];

        Axios.get(`/api/leaves/userLeaves/${user._id}`).then((response) => {
            console.log(response.data)
            setstate({ userLeaves: response.data })
        });
            
    };

    const [pendingLeavesActive, setPendingLeavesActive] = useState(false);
    const [approvedLeavesActive, setApprovedLeavesActive] = useState(false);
    const [rejectedLeavesActive, setRejectedLeavesActive] = useState(false);

    useEffect(() => {
        getLeavesData();

        setTimeout(() => {
            setPendingLeavesActive(true);
            setPendingLeavesActive(false);
            setApprovedLeavesActive(true);
            setApprovedLeavesActive(false);
            setRejectedLeavesActive(true);
            setRejectedLeavesActive(false);
        }, 1000);
    }, [user]);

    return (
        <div className="leavesHistory">
            <MainHeader />
            <SecondHeader />
            <LocationHeader location="Leaves History" />

            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv">
                        <div className="wcfc__title">
                            <span className="material-icons">pending_actions</span>
                            <h3 className="wcfc__titleText">Pending Leaves</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={() => setPendingLeavesActive(!pendingLeavesActive)}>
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>
                    {pendingLeavesActive ? (
                        <div className="wcfc__bodyDiv">
                            {state.userLeaves
                                .filter((leave) => leave.status === "Pending")
                                .map((leave, index) => (
                                    <Link to={`leavePage/${leave._id}`} key={index} className="linkToLeave">
                                        <LeaveComponent leave={leave} status={leave.status} comment={leave.comment} dateTo={leave.dateTo} dateFrom={leave.dateFrom} natureLeave={leave.natureLeave} lId={leave._id} dateRejoinRequestStatus={leave.dateRejoinRequestStatus} />
                                    </Link>
                                ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv green">
                        <div className="wcfc__title ">
                            <span className="material-icons">assignment_turned_in</span>
                            <h3 className="wcfc__titleText">Approved Leaves</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={() => setApprovedLeavesActive(!approvedLeavesActive)}>
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>
                    {approvedLeavesActive ? (
                        <div className="wcfc__bodyDiv">
                            {state.userLeaves
                                .filter((leave) => leave.status === "Approved")
                                .map((leave, index) => (
                                    <Link to={`leavePage/${leave._id}`} key={index} className="linkToLeave">
                                        <LeaveComponent leave={leave} status={leave.status} comment={leave.comment} dateTo={leave.dateTo} dateFrom={leave.dateFrom} natureLeave={leave.natureLeave} lId={leave._id} />
                                    </Link>
                                ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv red">
                        <div className="wcfc__title ">
                            <span className="material-icons">not_interested</span>
                            <h3 className="wcfc__titleText">Rejected Leaves</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={() => setRejectedLeavesActive(!rejectedLeavesActive)}>
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>
                    {rejectedLeavesActive ? (
                        <div className="wcfc__bodyDiv">
                            {state.userLeaves
                                .filter((leave) => leave.status === "Rejected")
                                .map((leave, index) => (
                                    <Link to={`leavePage/${leave._id}`} key={index} className="linkToLeave">
                                        <LeaveComponent leave={leave} status={leave.status} comment={leave.comment} dateTo={leave.dateTo} dateFrom={leave.dateFrom} natureLeave={leave.natureLeave} lId={leave._id} dateRejoined={leave.dateRejoined} dateRejoinRequest={leave.dateRejoinRequest} />
                                    </Link>
                                ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

export default LeavesHistory;

/*


setPendingLeaves(myLeaves.filter(leave=>leave.status==='Pending'))
        setApprovedLeaves(myLeaves.filter(leave=>leave.status==='Approved'))
        setRejectedLeaves(myLeaves.filter(leave=>leave.status==='Rejected'))

*/
