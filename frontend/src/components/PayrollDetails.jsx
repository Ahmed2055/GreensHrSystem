import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';
import personalPic from '../pics/personalPic.jpg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { Link , useHistory} from 'react-router-dom'
import axios from "../store/axios";


function PayrollDetails() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [state, setstate] = useState({userLeaves:[]});


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userSlips, setUserSlips] = useState([])

    const getPaySlipsData = ()=>{
        var myPaySlips = [];
        axios.get(`/api/payrolls/userPayrolls/${user._id}`).then((response) => {
            setUserSlips(response.data);
            console.log(response.data);
        });


        }
    
    const [submittedUserSlips, setSubmittedUserSlipsUserSlips] = useState([])

    const handleSubmit = () =>{

        
        setSubmittedUserSlipsUserSlips(userSlips.filter((slip=>  new Date(slip.month) > startDate   && new Date(slip.month) < endDate  )))

    }

    useEffect(()=>{
        getPaySlipsData()
    }, [user])

    return (
        <div className='payrollDetails'>
            <div className="payrollDetails__personalDetails">
                <div className="payrollDetails__personalDetail">
                    <span className="payrollDetails__detailTitle">Employee Name</span>
                    <span className="payrollDetails__detailText">{user.employeeName}</span>
                </div>
                <div className="payrollDetails__personalDetail">
                    <span className="payrollDetails__detailTitle">Employee ID</span>
                    <span className="payrollDetails__detailText">{user.companyId}</span>
                </div>
                <div className="payrollDetails__personalDetail">
                    <span className="payrollDetails__detailTitle">Currency</span>
                    <span className="payrollDetails__detailText">SAR</span>
                </div>
            </div>

            <div className="payrollDetails__personalDetails">
                <div className="payrollDetails__personalDetail">
                    <span className="payrollDetails__detailTitle ">From Date </span>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="payrollDetails__personalDetail">
                    <span className="payrollDetails__detailTitle pd__Dates">To Date  </span>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
                <div className="payrollDetails__personalDetail ">
                    <button className="payrollDetails__detailText submit " onClick={()=>handleSubmit()}>Submit</button>
                </div>
            </div>

            {submittedUserSlips.length > 0 ? 
            <div className="payrollDetails__dataContainer">
            <div className='payrollSlips' >
                <table className='payrollSlips__table'>
                    <thead className='payrollSlips__thead'>
                        <tr className='payrollSlips__tr'>
                            <td className='payrollSlips__td pdHead'>Month</td>
                            <td className='payrollSlips__td pdHead'>Basic</td>
                            <td className='payrollSlips__td pdHead'>Allowances</td>
                            <td className='payrollSlips__td pdHead ps__mobileHidden'>Deductions</td>
                            <td className='payrollSlips__td pdHead'>Net Bay</td>
                            <td className='payrollSlips__td pdHead'>Pay Slip</td>
                        </tr>
                    </thead>
                    <tbody className='payrollSlips__tbody'>
                        {submittedUserSlips.map((slip,index)=>(
                            <tr className='payrollSlips__tr' key={index} >
                                <td className='payrollSlips__td '>{new Date(slip.month).toLocaleDateString()}</td>
                                <td className='payrollSlips__td '>{parseFloat(slip.basicPay).toFixed(2)}</td>
                                <td className='payrollSlips__td '>{parseFloat(slip.netPay).toFixed(2)}</td>
                                <td className='payrollSlips__td ps__mobileHidden'>{((parseFloat(slip.campaigns))+parseFloat(slip.fixedOverTime)+parseFloat(slip.housingAllowance)+parseFloat(slip.incentives)+parseFloat(slip.otherIncentives)+parseFloat(slip.overTimeAllowance)+parseFloat(slip.percentage)+parseFloat(slip.ticketsAllowance)+parseFloat(slip.transportAllowance)).toFixed(2)}</td>
                                <td className='payrollSlips__td '>{parseFloat(slip.netPay).toFixed(2)}</td>
                                <td className='payrollSlips__td  '> <Link to={`slipPage/${slip._id}`} className='ps__viewBtn'>view</Link> </td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>
            </div>
            </div>
            : ''}

        </div>
    )
}

export default PayrollDetails
