import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams} from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashSecondHeader from '../components/DashSecondHeader'
import LocationHeader from '../components/LocationHeader'
import LeaveComponent from '../components/LeaveComponent'
import axios from '../store/axios';

function ReturnRequests() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    let match = useRouteMatch();

    

    const [leaves, setLeaves] = useState([])
    const [leaveActive, setLeaveActive] = useState(null)
    const [pendingReturnLeavesActive, setPendingReturnLeavesActive ] = useState(false)
    const [rejectedReturnLeavesActive, setRejectedReturnLeavesActive ] = useState(false)
    const [approvedReturnLeavesActive, setApprovedReturnLeavesActive ] = useState(false)


    const getLeavesData = ()=>{
        axios.get(`/api/leaves/returnRequests`).then((response) => { setLeaves(response.data); });
      }

      useEffect(() => {
        if(leaves.length === 0 ){
            getLeavesData()
        }
      }, [])


    return (
        <div className='returnRequests'>
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader  />
            <LocationHeader location='Return Requests' />


            <div className="pageCentered__body">
            <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title bigger" >
                            <span className="material-icons">pending_actions</span>
                            <h3 className="wcfc__titleText ">Pending Return Requests</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setPendingReturnLeavesActive(!pendingReturnLeavesActive)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {pendingReturnLeavesActive?
                     <div className="wcfc__bodyDiv">
                     {leaves.filter(leave=>leave.status==='Approved').filter(leave=>leave.dateRejoinRequest!==undefined).filter(leave=>leave.dateRejoinRequestStatus!=='Approved').filter(leave=>leave.dateRejoinRequestStatus!=='Rejected').map((leaveRequest,index)=>(
                     
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
                            <h3 className="wcfc__titleText ">Rejected Return Requests</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setRejectedReturnLeavesActive(!rejectedReturnLeavesActive)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {rejectedReturnLeavesActive?
                     <div className="wcfc__bodyDiv">
                     {leaves.filter(leave=>leave.status==='Approved').filter(leave=>leave.dateRejoinRequest!==undefined).filter(leave=>leave.dateRejoinRequestStatus==='Rejected').map((leaveRequest,index)=>(
                     
                         <div className="whiteCenteredFlexibleContainer shadowedMargin" key={index}>
                             <div className="wcfc__titleDiv mainDarkColor ">
                                 <div className="wcfc__title black  " >
                                     <span className="material-icons mainDarkColor" color='inherit' >event</span>
                                     <h3 className="wcfc__titleText normalWeight"><Link to={`/leavePage/${leaveRequest._id}`} className='pointer notUnderlined mainDarkColor' >{leaveRequest.applyDate} - {leaveRequest.requesterName} -  {leaveRequest.natureLeave} </Link> </h3>
                                 </div>
                                 <div className="wcfc__btnExpand" onClick={()=>setLeaveActive(leaveRequest.id)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
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
                    <div className="wcfc__titleDiv green">
                        <div className="wcfc__title bigger" >
                            <span className="material-icons">assignment_turned_in</span>
                            <h3 className="wcfc__titleText ">Approved Return Requests</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setApprovedReturnLeavesActive(!approvedReturnLeavesActive)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {approvedReturnLeavesActive?
                     <div className="wcfc__bodyDiv">
                     {leaves.filter(leave=>leave.status==='Approved').filter(leave=>leave.dateRejoinRequest!==undefined).filter(leave=>leave.dateRejoinRequestStatus==='Approved').map((leaveRequest,index)=>(
                     
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


        </div>
    )
}

export default ReturnRequests
