import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import MainHeader from '../components/MainHeader'
import SecondHeader from '../components/SecondHeader'
import LocationHeader from '../components/LocationHeader'
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PayrollDetails from '../components/PayrollDetails';
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { Link , useHistory} from 'react-router-dom'
 

function PayrollHistory() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [state, setstate] = useState({userLeaves:[]});


    const getPaySlipsData = ()=>{
      var myPaySlips = [];

      }


    const [profileActive, setProfileActive] = useState(true) 



    return (
        <div className='payrollHistory'>
            <MainHeader />
            <SecondHeader />
            <LocationHeader  location='Payroll History' />

            <div className="payrollHistory__container">
                <div className="payrollHistory__title">
                    <div className="payrollHistory__titleLeft">
                        <HistoryIcon color='inherit'  />
                        <h3 className="payrollHistory__titleText">Payroll History</h3>
                    </div>
                    <div className="payrollHistory__btnExpand" ><ExpandMoreIcon color='inherit' fontSize='large' onClick={()=>setProfileActive(!profileActive)} /></div>
                </div>
                { profileActive ? <div className="payrollHistory__info"><PayrollDetails /></div> : ''}
            </div>
        </div>
    )
}

export default PayrollHistory
