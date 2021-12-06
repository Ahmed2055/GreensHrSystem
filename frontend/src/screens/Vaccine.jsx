import React, {useState, useEffect} from 'react'
import LocationHeader from '../components/LocationHeader'
import MainHeader from '../components/MainHeader'
import SecondHeader from '../components/SecondHeader'
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { Link , useHistory} from 'react-router-dom'
import axios from "../store/axios";
import Cookies from "js-cookie";
import { setUser } from "../features/auth/authSlice";

function Vaccine() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();


    const [vaccineStatus, setVaccineStatus] = useState('firstDoseTaken');

    const [firstDoseDate, setFirstDoseDate] = useState(new Date());
    const [secondDoseDate, setSecondDoseDate] = useState(new Date());
    const [vaccineChecked, setVaccineChecked] = useState(false);

    const [profileActive, setProfileActive] = useState(true) 

    const handleVaccinationDetails =()=>{
        const editedUser = JSON.parse(JSON.stringify(user))
        editedUser.vaccinated = true;
        if(vaccineStatus==='noDoseTaken'){
            setFirstDoseDate(null)
            setSecondDoseDate(null)
            editedUser.vaccinated = false;
        }
        if(vaccineStatus==='firstDoseTaken'){
            setSecondDoseDate(null)
        }
        const vaccinationDetails = {vaccineStatus, firstDoseDate: `${ vaccineStatus==='noDoseTaken'? null : firstDoseDate }` , secondDoseDate:`${ vaccineStatus==='noDoseTaken' ||  vaccineStatus==='firstDoseTaken' ? null : secondDoseDate }` , vaccineChecked }
        console.log(vaccinationDetails)

        editedUser.vaccinationDetails = vaccinationDetails
        console.log(editedUser)
        axios.post(`api/users/editUserDetails/${user._id}`, editedUser).then((response) => {
            const data = response.data;
            console.log(response);
            dispatch(setUser(data));
            Cookies.set("greensUserInfo", `${JSON.stringify(data)}`, { expires: 7, path: "/" });
            history.push('/');
        });

    }

    return (
        <div className='vaccine'>
            <MainHeader />
            <SecondHeader />
            <LocationHeader  location='COVID19 Vaccine Details' />

            <div className="vaccine__container">
                <div className="vaccine__title">
                    <div className="vaccine__titleLeft">
                        <PersonIcon color='inherit'  />
                        <h3 className="vaccine__titleText">Vaccination Details </h3>
                    </div>
                    <div className="vaccine__btnExpand" ><ExpandMoreIcon color='inherit' fontSize='large' onClick={()=>setProfileActive(!profileActive)} /></div>
                </div>

                <div className="vaccine__details">
                    <div className="vaccine__detail">
                        <span className="vaccine__detailTitle">Employee ID</span>
                        <p className="vaccine__detailInput">{user.companyId}</p>
                    </div>
                    <div className="vaccine__detail">
                        <span className="vaccine__detailTitle">Employee Name</span>
                        <p className="vaccine__detailInput"> {user.employeeName} </p>
                    </div>
                    <div className="vaccine__detail">
                        <span className="vaccine__detailTitle">Vaccine Taken <span className="red">*</span></span>
                        <select className="vaccine__detailSelector"  name='vaccineTaken' value={vaccineStatus} onChange={(e)=>setVaccineStatus(e.target.value)}>
                                <option value={'firstDoseTaken'} >First dose taken </option>
                                <option value={'secondDoseTaken'} >Second dose taken </option>
                                <option value={'noDoseTaken'} >No Dose Taken</option>
                        </select>
                    </div>
                   
                    {vaccineStatus==='firstDoseTaken'?
                    <div className="vaccine__detail">
                        <span className="vaccine__detailTitle">First Dose Date</span>
                        <div className="vaccine__DatePicker "><DatePicker selected={firstDoseDate} onChange={(date) => setFirstDoseDate(date)} /></div>
                    </div> : ''}
                    {vaccineStatus ==='secondDoseTaken'?
                    <div>
                        <div className="vaccine__detail">
                            <span className="vaccine__detailTitle">First Dose Date</span>
                            <div className="vaccine__DatePicker "><DatePicker selected={firstDoseDate} onChange={(date) => setFirstDoseDate(date)} /></div>
                        </div>
                        <div className="vaccine__detail">
                            <span className="vaccine__detailTitle">Second Dose Date</span>
                            <div className="vaccine__DatePicker "><DatePicker selected={secondDoseDate} onChange={(date) => setSecondDoseDate(date)} /></div>
                        </div>
                    </div> : ''}
                    
                    <div className="vaccine__detail">
                        <span className="vaccine__detailTitle">Vaccination Completed</span>
                        <input value={vaccineChecked} type="checkbox" onClick={()=>setVaccineChecked(!vaccineChecked)} className="vaccine__checkBox"></input>
                    </div>
                </div>

                <div className="vaccine__submit">
                    <button className="vaccine__submitBtn " onClick={()=>handleVaccinationDetails()}> Submit </button>
                </div>
            </div>

            
        </div>
    )
}

export default Vaccine
