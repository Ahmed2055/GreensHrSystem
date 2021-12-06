import React,{useState, useEffect} from 'react'
import axios from '../store/axios';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams} from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashSecondHeader from '../components/DashSecondHeader'
import LocationHeader from '../components/LocationHeader'
import LeaveComponent from '../components/LeaveComponent'

function LeaveRequests() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    let match = useRouteMatch();

    const [cookiesEmail, setCookiesEmail] = useState(Cookies.get('email'))
    const [cookiesPassword, setCookiesPassword] = useState(Cookies.get('password'))




    const [leaves, setLeaves] = useState([])
    const [leaveActive, setLeaveActive] = useState(null)
    const [pendingLeavesActive, setPendingLeavesActive ] = useState(false)
    const [approvedLeavesActive, setApprovedLeavesActive ] = useState(false)
    const [rejectedLeavesActive, setRejectedLeavesActive ] = useState(false)

    const getLeavesData = ()=>{
        axios.get(`/api/leaves/leaveRequests`).then((response) => { setLeaves(response.data); });

      }

      useEffect(() => {
        if(leaves.length === 0 ){
            getLeavesData()
        }
      }, [])


    return (
        <div className='leaveRequests' >
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader  />
            <LocationHeader location='Leave Requests' />

            <div className="pageCentered__body">
            <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv">
                        <div className="wcfc__title bigger" >
                            <span className="material-icons">pending_actions</span>
                            <h3 className="wcfc__titleText">Pending Leaves</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setPendingLeavesActive(!pendingLeavesActive)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {pendingLeavesActive?
                    <div className="wcfc__bodyDiv">
                    {leaves.filter(leave=>leave.status==='Pending').map((leaveRequest,index)=>(
                        <div className="whiteCenteredFlexibleContainer shadowedMargin" key={index}>
                            <div className="wcfc__titleDiv mainDarkColor ">
                                <div className="wcfc__title   " >
                                    <span className="material-icons mainDarkColor" color='inherit'>event</span>
                                    <h3 className="wcfc__titleText normalWeight"><Link to={`/leavePage/${leaveRequest._id}`} className='pointer notUnderlined mainDarkColor' >{leaveRequest.applyDate} - {leaveRequest.requesterName} -  {leaveRequest.natureLeave} </Link> </h3>
                                </div>
                                <div className="wcfc__btnExpand" onClick={()=>setLeaveActive(leaveRequest._id)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                            </div>
                            {leaveActive === leaveRequest._id?
                                <div   className="wcfc__bodyDiv">
                                    <LeaveComponent leave={leaveRequest}  />
                                </div>    
                            :''}
                        </div>
                    ))}
                    </div>
                    :''}
                       
            </div>
            </div>

            <div className="pageCentered__body">
            <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv green">
                        <div className="wcfc__title bigger" >
                            <span className="material-icons">assignment_turned_in</span>
                            <h3 className="wcfc__titleText ">Approved Leaves</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setApprovedLeavesActive(!approvedLeavesActive)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {approvedLeavesActive?
                     <div className="wcfc__bodyDiv">
                     {leaves.filter(leave=>leave.status==='Approved').map((leaveRequest,index)=>(
                     
                         <div className="whiteCenteredFlexibleContainer shadowedMargin" key={index}>
                             <div className="wcfc__titleDiv mainDarkColor ">
                                 <div className="wcfc__title black  " >
                                     <span className="material-icons mainDarkColor" color='inherit' >event</span>
                                     <h3 className="wcfc__titleText normalWeight"><Link to={`/leavePage/${leaveRequest._id}`} className='pointer notUnderlined mainDarkColor' >{leaveRequest.applyDate} - {leaveRequest.requesterName} -  {leaveRequest.natureLeave} </Link> </h3>
                                 </div>
                                 <div className="wcfc__btnExpand" onClick={()=>setLeaveActive(leaveRequest._id)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                             </div>
                             {leaveActive === leaveRequest._id?
                                 <div className="wcfc__bodyDiv ">
                                     <LeaveComponent leave={leaveRequest}  />
                                 </div>    
                             :''}
                         </div>
                     ))}
                     </div>
                    :''}
                      
            </div>
            </div>

            <div className="pageCentered__body">
            <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv red">
                        <div className="wcfc__title bigger" >
                            <span className="material-icons">not_interested</span>
                            <h3 className="wcfc__titleText ">Rejected Leaves</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setRejectedLeavesActive(!rejectedLeavesActive)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {rejectedLeavesActive?
                    <div className="wcfc__bodyDiv">
                    {leaves.filter(leave=>leave.status==='Rejected').map((leaveRequest,index)=>(
                    
                        <div className="whiteCenteredFlexibleContainer shadowedMargin" key={index}>
                            <div className="wcfc__titleDiv ">
                                <div className="wcfc__title mainDarkColor  " >
                                    <span className="material-icons mainDarkColor" color='inherit'>event</span>
                                    <h3 className="wcfc__titleText normalWeight"><Link to={`/leavePage/${leaveRequest._id}`} className='pointer notUnderlined mainDarkColor' >{leaveRequest.applyDate} - {leaveRequest.requesterName} -  {leaveRequest.natureLeave} </Link> </h3>
                                </div>
                                <div className="wcfc__btnExpand mainDarkColor" onClick={()=>setLeaveActive(leaveRequest._id)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                            </div>
                            {leaveActive === leaveRequest._id?
                                <div className="wcfc__bodyDiv ">
                                    <LeaveComponent leave={leaveRequest}  />
                                </div>    
                            :''}
                        </div>
                    ))}
                    </div>
                    :''}
                       
            </div>
            </div>


        </div>
    )
}

export default LeaveRequests
