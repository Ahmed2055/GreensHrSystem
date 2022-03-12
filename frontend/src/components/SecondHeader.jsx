import React, {useState} from 'react'
import { Link , useHistory} from 'react-router-dom'
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import VaccinesIcon from '@mui/icons-material/Vaccines';

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

            <div  className="secondHeader__Link"  onClick={()=>handleSecondHeaderLink('dt')} > Daily Reports
                {secondHeaderActive === 'dt'? 
                <div className="secondHeader__LinkList  ">
                    <Link to='/salesReports' className="secondHeader__LinkItem">
                        <EqualizerIcon color='inherit' />
                        <p className="secondHeader__LinkText">Sales Reports</p>
                    </Link>
                    <Link to='/trendingShortages' className="secondHeader__LinkItem">
                        <TrendingUpIcon color='inherit' />
                        <p className="secondHeader__LinkText">Trending Shortages</p>
                    </Link>
                    <Link to='/labourCheck' className="secondHeader__LinkItem">
                        <ChangeCircleIcon color='inherit' />
                        <p className="secondHeader__LinkText">Labour Check In/Out</p>
                    </Link>
                    <Link to='/vaccine' className="secondHeader__LinkItem">
                        <VaccinesIcon color='inherit' />
                        <p className="secondHeader__LinkText">Vaccination Reports</p>
                    </Link>
                </div> 
                : 
                 <div className="secondHeader__LinkList hidden "></div> }
                
            </div>
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

        </div>
        </>
    )
}

export default SecondHeader
