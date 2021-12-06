import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AssessmentIcon from '@mui/icons-material/Assessment';

function DashSecondHeader() {

    const [secondHeaderActive, setSecondHeaderActive ] = useState(null)

    const handleSecondHeaderLink =(listToBeActived)=>{
        if(secondHeaderActive !== listToBeActived){
            setSecondHeaderActive(listToBeActived)
        }
        if(secondHeaderActive === listToBeActived){
            setSecondHeaderActive(null)
        }
    }

    return (
        <div className='DashSecondHeader'>
            <div className='secondHeader'>
                <Link to='/' className="secondHeader__Link" > DashBoard </Link>
                <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('employees')} > Employees
                    {secondHeaderActive === 'employees'? 
                    <div className="secondHeader__LinkList  ">
                        <Link to='/dashBoardAllUsers' className="secondHeader__LinkItem">
                            <PeopleIcon color='inherit' />
                            <p className="secondHeader__LinkText"> View Employees</p>
                        </Link>
                        <Link to='/dashBoardAddUser' className="secondHeader__LinkItem">
                            <PersonAddIcon color='inherit' />
                            <p className="secondHeader__LinkText">New Employee(s)</p>
                        </Link>
                    </div> 
                    : 
                    <div className="secondHeader__LinkList hidden "></div> }
                </div>
                
                

                <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('lrl')} > Leave & Return Requests
                {secondHeaderActive === 'lrl'? 
                    <div className="secondHeader__LinkList  ">
                        <Link to='/leaveRequests' className="secondHeader__LinkItem">
                            <FlightTakeoffIcon color='inherit' />
                            <p className="secondHeader__LinkText">Leave Requests</p>
                        </Link>
                        <Link to='/returnRequests' className="secondHeader__LinkItem">
                            <FlightLandIcon color='inherit' />
                            <p className="secondHeader__LinkText">Return Requests</p>
                        </Link>
                    </div> 
                    : 
                    <div className="secondHeader__LinkList hidden "></div> }
                </div>

                <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('v')} > Visits
                {secondHeaderActive === 'v'? 
                    <div className="secondHeader__LinkList  ">
                        <Link to='/dashVisitAdd' className="secondHeader__LinkItem">
                            <PlaylistAddCheckIcon color='inherit' />
                            <p className="secondHeader__LinkText">New Visit</p>
                        </Link>
                        <Link to='/visitsHistory' className="secondHeader__LinkItem">
                            <HistoryIcon color='inherit' />
                            <p className="secondHeader__LinkText">Visits History</p>
                        </Link>
                    </div> 
                    : 
                    <div className="secondHeader__LinkList hidden "></div> }
                </div>
                
            </div>
            
            
        </div>
    )
}

export default DashSecondHeader
