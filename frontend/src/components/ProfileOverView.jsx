import React, {useState} from 'react'
import PersonIcon from '@mui/icons-material/Person';
import unKnownPic from '../pics/unknownPic.jpg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';

function ProfileOverView() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    

    // a and b are javascript Date objects
    function dateDiffinTime(a, b) {
        const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
        const total = Math.abs(  Date.parse(a) - b )  
        const years = Math.floor(total / MS_PER_YEAR )
        const months = Math.floor(total/ (1000 * 60 * 60 * 24 * 30)) - (years*12);
        const days = Math.floor(   (total/ (1000 * 60 * 60 * 24 )  - (years*12*30)) - (months*30)   )
        var result=`${years} Y ${months} M ${days} D`
        var shortResult = `${years} year(s)`
        return shortResult;
    }

    
    


  

    const [profileActive, setProfileActive] = useState(true) 
    const [timeNow, setTimeNow] = useState(new Date)
    const [testDate, settestDate] = useState('12/27/2016')
    const [workPeriod, setWorkPeriod] = useState(dateDiffinTime(user.joiningDate,timeNow) )
    const [age, setAge] = useState(dateDiffinTime(user.birthDate,timeNow) )
    

    const getPersonalPic = ()=>{
        var result =  user.companyId;
        console.log(result)
        return result;
    }

    return (
        <div className='profileOverView'>
            <div className="profileOverView__title">
                <div className="profileOverView__titleLeft">
                    <PersonIcon color='inherit'  />
                    <h3 className="profileOverView__titleText">Employee Profile Overview</h3>
                </div>
                <div className="profileOverView__btnExpand" ><ExpandMoreIcon color='inherit' fontSize='large' onClick={()=>setProfileActive(!profileActive)} /></div>
            </div>
            {profileActive? 
            <div className="profileOverView__content">
                <div className="profileOverView__picDiv"><img src={unKnownPic} alt="AccountPic" className="profileOverView__pic" /></div>
                <div className="profileOverView__info">
                    <h6 className="profileOverView__name">{user.employeeName}</h6>
                    <h6 className="profileOverView__pk">{user.companyId}</h6>
                    <p className="profileOverView__gender">{user.gender}</p>
                    <p className="profileOverView__position">{user.position}</p>
                    <p className="profileOverView__email">{user.email}</p>
                    <p className="profileOverView__joinDate"><span className="profileOverView__joinDateStarter">Current Status:</span> {user.status}</p>
                    <p className="profileOverView__joinDate"><span className="profileOverView__joinDateStarter">Current Pharmacy:</span> {user.currentPharmacy}</p>
                    <p className="profileOverView__joinDate"><span className="profileOverView__joinDateStarter">Date of Joining:</span> {new Date(user.joiningDate).toLocaleDateString()} | About {workPeriod} of Work</p>
                    <p className="profileOverView__birthDate"><span className="profileOverView__birthDateStarter">Date of Birth:</span> {new Date(user.birthDate).toLocaleDateString()} | About {age} old</p>
                </div>
            </div>
            :
            <div className="profileOverView__spacer">   </div>
            }
        </div>
    )
}

export default ProfileOverView
