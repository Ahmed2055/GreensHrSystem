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


function AccSecondHeader() {

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
                <Link to='/dashHome' className="secondHeader__Link" onMouseEnter={()=>setSecondHeaderActive(null)}> DashBoard </Link>
                <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('employees')} > Employees
                    {secondHeaderActive === 'employees'? 
                    <div className="secondHeader__LinkList  ">
                        <Link to='/accAllUsers' className="secondHeader__LinkItem">
                            <PeopleIcon color='inherit' />
                            <p className="secondHeader__LinkText"> View Employees</p>
                        </Link>
                    </div> 
                    : 
                    <div className="secondHeader__LinkList hidden "></div> }
                </div>
                
                
            </div>
            
            
        </div>
    )
}

export default AccSecondHeader
