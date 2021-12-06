import React,{useState, useEffect,useReducer} from 'react'
import Cookies from 'js-cookie';
import LocationHeader from '../components/LocationHeader'
import MainHeader from '../components/MainHeader'
import SecondHeader from '../components/SecondHeader'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { Link , useHistory} from 'react-router-dom'
import LeaveComponent from '../components/LeaveComponent';
import Axios from '../store/axios';


function LeaveRejoin() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();


    const [state, setstate] = useState({userLeaves:[]});


            const getLeavesData = ()=>{
            var myLeaves = [];

            Axios.get(`/api/leaves/userLeaves/${user._id}`).then((response) => {
                console.log(response.data)
                setstate({ userLeaves: response.data })
            });
                   
            }
        

    const [approvedLeavesActive, setApprovedLeavesActive ] = useState(true)

    useEffect(()=>{
        getLeavesData()

        setTimeout(() => {
            setApprovedLeavesActive(false)
            setApprovedLeavesActive(true)
        }, 1000);

    }, [user])

    return (
        <div className='leaveRejoin'>
            <MainHeader />
            <SecondHeader />
            <LocationHeader  location='Leaves Rejoin' />

            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title " >
                            <span className="material-icons">hourglass_bottom</span>
                            <h3 className="wcfc__titleText">Non-Returned Leaves</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setApprovedLeavesActive(!approvedLeavesActive)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {approvedLeavesActive? 
                    <div className="wcfc__bodyDiv">
                        {state.userLeaves.filter(leave=>leave.status==='Approved').filter(leave=>leave.dateRejoined===null).map((leave,index)=>
                        <Link to={`leavePage/${leave._id}`} key={index} className='linkToLeave' >
                                <LeaveComponent leave={leave} status={leave.status} comment={leave.comment} dateTo={leave.dateTo} dateFrom={leave.dateFrom} natureLeave={leave.natureLeave} lId={leave._id} />
                        </Link>)}
                    </div>
                    : '' }
                </div>
                
            </div>

            
        </div>
    )
}

export default LeaveRejoin
