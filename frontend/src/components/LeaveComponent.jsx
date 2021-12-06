import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';

function LeaveComponent({leave}) {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    let match = useRouteMatch();

    return (
        <div>
            <div className='leaveComponent'>
                <div className="leaveC__left">
                    <div className="leaveC__line">
                        <p className="leaveC__title">Status</p>
                        <span className={`leaveC__text  ${leave.status==='Pending' && 'mainDarkColor'} ${leave.status==='Approved'&& 'green'} ${leave.status==='Rejected' && 'red'} `}>{leave.status && leave.status}</span>
                    </div>
                    <div className="leaveC__line">
                        <p className="leaveC__title">Nature Of Leave</p>
                        <span className="leaveC__text">{leave.natureLeave} </span>
                    </div>
                </div>
                <div className="leaveC__right">
                    <div className="leaveC__line">
                        <p className="leaveC__title">From Date</p>
                        <span className="leaveC__text">{leave.dateFrom}</span>
                    </div>
                    <div className="leaveC__line">
                        <p className="leaveC__title">To Date</p>
                        <span className="leaveC__text">{leave.dateTo}</span>
                    </div>
                </div>
                <div className="leaveC__line">
                    <p className="leaveC__title">Comment (reason)</p>
                    <span className="leaveC__text">{leave.comment}</span>
                </div>
                {leave.status==='Approved'?
                <div>
                    <div className="leaveC__line">
                        <p className="leaveC__title">Rejoined?</p>
                        <span className="leaveC__text">{leave.dateRejoined===null?  ` Rejoin hasn't been ${leave.dateRejoinRequest===undefined? "Requested":"Approved"} yet` :  'Yes' }</span>
                    </div>
                    {leave.dateRejoined===null? 
                    <div></div>
                    :
                    <div className="leaveC__line">
                        <p className="leaveC__title">Date of Rejoin</p>
                        <span className="leaveC__text">{new Date(leave.dateRejoined).toLocaleDateString()}</span>
                    </div>}         
                </div>
                :''}
            </div>

        </div>
    )
}

export default LeaveComponent
