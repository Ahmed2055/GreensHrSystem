import React, {useState, useEffect} from 'react'
import { Link , useHistory} from 'react-router-dom'
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AssessmentIcon from '@mui/icons-material/Assessment';


function SecondHeader() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [secondHeaderActive, setSecondHeaderActive ] = useState(null)
    const [unKnownUser , setUnknownUser] = useState({
        email: '',
        password: '',
        isAdmin: false,
        isAccountant:  false,
        employeeName:'',
        shorterName:'',
        shortestName:'',
        currentPharmacy: '',  
        firstName:'',
        secondName:'',
        lastName:'',
        companyId:'',
        gender:'',
        nationality:'',
        position:'',
        birthDate:  '',
        joiningDate: '',
        telNo: '',
        contacts: [],
        employmentType: '',
        paySlips: [],
        leaves: [],
        SalaryTransferMode:'',
        bankAccountNo:'',
        bankName:'',
        propationPeriod:'',
        vaccinated:true,
        vaccinationDetails:{},
        status: 'On the Job'
      })

    const handleSecondHeaderLink =(listToBeActived)=>{
        if(secondHeaderActive !== listToBeActived){
            setSecondHeaderActive(listToBeActived)
        }
        if(secondHeaderActive === listToBeActived){
            setSecondHeaderActive(null)
        }
    }

    const signOut=()=>{

        dispatch(setUser(unKnownUser))
        Cookies.set('greensUserInfo', `${JSON.stringify(unKnownUser)}`, {expires: 7, path: '/' });
        console.log(JSON.parse(JSON.stringify(unKnownUser)))
        history.push('/login')

    }

    return (
        <>
        <div className='secondHeader'>
            <Link to='/home' className="secondHeader__Link" > Home </Link>
            <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('p')} > Payroll
                {secondHeaderActive === 'p'? 
                <div className="secondHeader__LinkList  ">
                    <Link to='/overtimeRequest' className="secondHeader__LinkItem">
                        <AddToPhotosIcon color='inherit' />
                        <p className="secondHeader__LinkText">Overtime Request</p>
                    </Link>
                    <Link to='/payrollHistory' className="secondHeader__LinkItem">
                        <HistoryIcon color='inherit' />
                        <p className="secondHeader__LinkText">Payroll history</p>
                    </Link>
                </div> 
                : 
                 <div className="secondHeader__LinkList hidden "></div> }
            </div>
            <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('leaves')} > Leaves
                {secondHeaderActive === 'leaves'? 
                <div className="secondHeader__LinkList  ">
                    <Link to='/leaveRequest' className="secondHeader__LinkItem">
                        <FlightTakeoffIcon color='inherit' />
                        <p className="secondHeader__LinkText">Leave Request</p>
                    </Link>
                    <Link to='/leaveRejoin' className="secondHeader__LinkItem">
                        <FlightLandIcon color='inherit' />
                        <p className="secondHeader__LinkText">Leave Rejoin</p>
                    </Link>
                    <Link to='/leavesHistory' className="secondHeader__LinkItem">
                        <HistoryIcon color='inherit' />
                        <p className="secondHeader__LinkText">Leaves History</p>
                    </Link>
                </div> 
                : 
                 <div className="secondHeader__LinkList hidden "></div> }
            </div>

            <Link to='/dailyReports' className="secondHeader__Link"  > Daily Reports </Link>
            <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('ev')} > Evaluation
                {secondHeaderActive === 'ev'? 
                <div className="secondHeader__LinkList  ">
                    <Link to='/monthlyKPIs' className="secondHeader__LinkItem">
                        <AssessmentIcon color='inherit' />
                        <p className="secondHeader__LinkText">Monthly KPIs</p>
                    </Link>
                    <Link to='/visitsHistory' className="secondHeader__LinkItem">
                        <HistoryIcon color='inherit' />
                        <p className="secondHeader__LinkText"> My Visits History</p>
                    </Link>
                </div> 
                : 
                 <div className="secondHeader__LinkList hidden "></div> }
                
            </div>

            <div to='/' className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('a')} > Account
                {secondHeaderActive === 'a'?
                <div className="secondHeader__LinkList  ">
                    <Link to='/profile' className="secondHeader__LinkItem">
                        <AccountCircleIcon color='inherit' />
                        <p className="secondHeader__LinkText">Profile </p>
                    </Link>
                    <div  className="secondHeader__LinkItem" onClick={()=>signOut()}>
                        <ExitToAppIcon color='inherit' />
                        <p className="secondHeader__LinkText" >Logout</p>
                    </div>
                </div> 
                :
                <div className="secondHeader__LinkList hidden "></div>  }
            </div>

            <Link to='/vaccine' className="secondHeader__Link" onClick={()=>setSecondHeaderActive(null)}> Vaccination </Link>

        </div>
        </>
    )
}

export default SecondHeader
