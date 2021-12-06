import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams} from "react-router-dom";
import DashSecondHeader from '../components/DashSecondHeader'
import LocationHeader from '../components/LocationHeader'
import ProfileOverView from '../components/ProfileOverView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../store/axios';

function DashAllUsers() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    let match = useRouteMatch();

    

    const [employees, setEmployees] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [approvedNonReturnedLeavesActive, setApprovedNonReturnedLeavesActive ] = useState(true)
    const [activeEmployee, setActiveEmployee]= useState(null)

    const getUsersData = ()=>{
        axios.get(`/api/users`).then((response) => { setEmployees(response.data); });
      }

      useEffect(() => {
        getUsersData()
      }, [])
    
    return (
        <div className='dashAllUsers dashHome '>
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader  />
            <LocationHeader location='All Users' />

            {employees.filter((employee)=> !employee.isAdmin && !employee.isAccountant ).map((employee,index)=>
            <div className="pageCentered__body" key={index} >
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title " >
                            <span className="material-icons">person_outlined</span>
                            <h3 className="wcfc__titleText">{employee.shorterName}</h3>
                        </div>
                        <div className="wcfc__btnExpand" onClick={()=>setActiveEmployee(employee.companyId)} ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    {activeEmployee === `${employee.companyId}`? 
                    <div className="wcfc__bodyDiv">
                        <ProfileOverView employeeData={employee} />
                    </div>
                    : '' }
                </div>
            </div>
            )}
            

        </div>
    )
}

export default DashAllUsers
