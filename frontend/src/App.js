import React from "react";
import "./css/main.css";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home.jsx";
import Profile from "./screens/Profile";
import NotDeveloped from "./screens/NotDeveloped";
import LeaveRequest from "./screens/LeaveRequest";
import Vaccine from "./screens/Vaccine";
import DailyReports from "./screens/DailyReports";
import LeavePage from "./screens/LeavePage";
import LeavesHistory from "./screens/LeavesHistory";
import LeaveRejoin from "./screens/LeaveRejoin";
import PayrollHistory from "./screens/PayrollHistory";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/auth/authSlice";
import DashHome from "./screens/DashHome";
import DashAllUsers from "./screens/DashAllUsers";
import DashAddUser from "./screens/DashAddUser";
import LeaveRequests from "./screens/LeaveRequests";
import ReturnRequests from "./screens/ReturnRequests";
import DashVisitAdd from "./screens/DashVisitAdd";
import AccAllUsers from "./screens/AccAllUsers";
import AccHome from "./screens/AccHome";
import SlipPage from "./screens/SlipPage";
import AdminLeavePage from "./screens/AdminLeavePage";

function App() {
    const user = useSelector(selectUser);

    return (
        <div className="app">
            <Router>
                {user.isAccountant && (
                    <Switch>
                        <Route path="/accAllUsers">
                            <AccAllUsers />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <AccHome />
                        </Route>
                    </Switch>
                )}
                {user.isAdmin && (
                    <Switch>
                        <Route path="/returnRequests">
                            <ReturnRequests />
                        </Route>
                        <Route path="/leaveRequests">
                            <LeaveRequests />
                        </Route>
                        <Route path={`/leavePage/:leaveId`}>
                            <AdminLeavePage />
                        </Route>
                        <Route path="/dashBoardAllUsers">
                            <DashAllUsers />
                        </Route>
                        <Route path="/dashBoardAddUser">
                            <DashAddUser />
                        </Route>
                        <Route path="/visitsHistory">
                            <NotDeveloped />
                        </Route>
                        <Route path="/dashVisitAdd">
                            <DashVisitAdd />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <DashHome />
                        </Route>
                    </Switch>
                )}

                {!user.isAdmin && !user.isAccountant && (
                    <Switch>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/overtimeRequest">
                            <NotDeveloped />
                        </Route>
                        <Route path="/dailyReports">
                            <DailyReports />
                        </Route>
                        <Route path="/monthlyKPIs">
                            <NotDeveloped />
                        </Route>
                        <Route path="/visitsHistory">
                            <NotDeveloped />
                        </Route>
                        <Route path={`/leavePage/:leaveId`}>
                            <LeavePage />
                        </Route>
                        <Route path="/leavesHistory">
                            <LeavesHistory />
                        </Route>
                        <Route path="/leaveRejoin">
                            <LeaveRejoin />
                        </Route>
                        <Route path="/leaveRequest">
                            <LeaveRequest />
                        </Route>
                        <Route path={`/slipPage/:slipId`}>
                            <SlipPage />
                        </Route>
                        <Route path="/payrollHistory">
                            <PayrollHistory />
                        </Route>
                        <Route path="/vaccine">
                            <Vaccine />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                )}
            </Router>
        </div>
    );
}

export default App;
