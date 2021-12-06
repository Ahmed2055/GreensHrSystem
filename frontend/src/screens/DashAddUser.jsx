import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, useParams} from "react-router-dom";
import DashSecondHeader from '../components/DashSecondHeader';
import LocationHeader from '../components/LocationHeader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from '../store/axios';

function DashAddUser() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [state, setstate] = useState({pharmacies:[]});


        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')
        const [firstName, setFirstName] = useState('')
        const [secondName, setSecondName] = useState('')
        const [lastName, setLastName] = useState('')
        const [birthDate, setBirthDate] = useState(new Date())
        const [joinDate, setJoinDate] = useState(new Date())
        const [nationality, setNationality] = useState('Egyptian')
        const [gender, setGender] = useState('Male')
        const [position, setPosition] = useState('Pharmacist')
        const [propationPeriod, setPropationPeriod] = useState('3 Months')
        const [salaryTransferMode, setSalaryTransferMode] = useState('Bank Transfer')
        const [bankName, setBankName] = useState('Al Bilad Bank')
        const [bankAccountNo, setBankAccountNo] = useState('')
        const [telNo, setTelNo] = useState('')
        const [companyId, setCompanyId] = useState('')
        const [submitBtnPressed, setSubmitBtnPressed] = useState(false)
        const [currentPlaceofWork, setCurrentPlaceofWork] = useState('')
        const [allPharmacies, setAllPharmacies] = useState([])

        const getDataPharmacies = () =>{
            axios.get(`/api/pharmacies`).then((response) => { setAllPharmacies(response.data); });
        }

    const addNewUser = (e) => {

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }

        const newUser = {
            employeeName:`${firstName} ${secondName} ${lastName}`,
            shorterName:`${firstName} ${secondName.slice(0,secondName.indexOf(' '))} ${lastName}` ,
            shortestName:`${firstName} ${lastName}`,
            currentPharmacy: currentPlaceofWork ,  
            firstName:`${firstName}`,
            secondName:`${secondName}`,
            lastName:`${lastName}`,
            companyId:companyId,
            gender:gender,
            nationality:nationality,
            position:position,
            birthDate:birthDate.toLocaleDateString(),
            joiningDate:joinDate.toLocaleDateString(),
            email:email,
            telNo:telNo,
            contacts:[],
            employmentType:'Full Time',
            paySlips:[],
            leaves:[],
            SalaryTransferMode:salaryTransferMode,
            bankAccountNo:bankAccountNo,
            bankName:bankName,
            propationPeriod:propationPeriod,
            vaccinated:false,
            vaccinationDetails:{},
            password:password,
            status:'On the Job',
            admin:false,
        };

        setSubmitBtnPressed(true)

        console.log(newUser)

        axios.post('/api/users/register', newUser ).then((response) => { console.log(response.data);  history.push('/'); });
        
      }

      useEffect(() => {
        if(allPharmacies < 1){getDataPharmacies();}
      }, [])

    return (
        <div className='dashAddUser dashHome '>
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader  />
            <LocationHeader location='Add a New User' />
            
            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title " >
                            <span className="material-icons">person_add</span>
                            <h3 className="wcfc__titleText">Add A New Employee</h3>
                        </div>
                        <div className="wcfc__btnExpand"  ><ExpandMoreIcon color='inherit' fontSize='large'  /></div>
                    </div>
                    <div className="wcfc__bodyDiv">
                        <div className="dashAddUser__bodyLeft">
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Email</p>
                                <textarea value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Write his email here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">First Name</p>
                                <textarea value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='Write his First Name here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Second Name(s)</p>
                                <textarea value={secondName} onChange={(e)=>setSecondName(e.target.value)} placeholder='Write his Second Name here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Last Name</p>
                                <textarea value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Write his Last Name here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Password</p>
                                <textarea value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Write his Password here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Confirm Password</p>
                                <textarea value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Write his Password again here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Birth Date</p>
                                <div className="dashAddUser__lineRight" ><DatePicker selected={birthDate} onChange={(date)=>setBirthDate(date)} /></div>
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Joining Date</p>
                                <div className="dashAddUser__lineRight" ><DatePicker selected={joinDate} onChange={(date)=>setJoinDate(date)} /></div>
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Telephone Number</p>
                                <textarea value={telNo} onChange={(e)=>setTelNo(e.target.value)} placeholder='Write his Telephone Number here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                        </div>
                        <div className="dashAddUser__bodyRight">
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Company Id</p>
                                <textarea value={companyId} onChange={(e)=>setCompanyId(e.target.value)} placeholder='Write his Company Id here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Current Place of Work</p>
                                <div className="dashAddUser__lineRight" >
                                    <select className="dASLR__selector" name='currentPlaceofWork' value={currentPlaceofWork} onChange={(e)=>setCurrentPlaceofWork(e.target.value)}>
                                        <option value='Under Training' >Under Training</option>
                                        {allPharmacies.map((pharmacy, index)=><option key={index} value={pharmacy.pharmacyName} >{pharmacy.pharmacyName}</option>)}
                                        <option value='No Specific Place' >No Specific Place</option>
                                    </select>
                                </div>
                            </div> 
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Nationality</p>
                                <div className="dashAddUser__lineRight" >
                                    <select className="dASLR__selector" name='nationalities' value={nationality} onChange={(e)=>setNationality(e.target.value)}>
                                        <option value="Egyptian">Egyptian</option>
                                        <option value="Saudi">Saudi</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Indian">Indian</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Gender</p>
                                <div className="dashAddUser__lineRight" >
                                    <select className="dASLR__selector" name='gender' value={gender} onChange={(e)=>setGender(e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                           
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Position</p>
                                <div className="dashAddUser__lineRight" >
                                    <select className="dASLR__selector" name='Position' value={position} onChange={(e)=>setPosition(e.target.value)}>
                                        <option value="Pharmacist">Pharmacist</option>
                                        <option value="Female">Worker</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Propation Period</p>
                                <div className="dashAddUser__lineRight" >
                                    <select className="dASLR__selector" name='Position' value={propationPeriod} onChange={(e)=>setPropationPeriod(e.target.value)}>
                                        <option value="0 Days">0 Days</option>
                                        <option value="3 Months">3 Months</option>
                                        <option value="6 Months">6 Months</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Salary Transfer Mode</p>
                                <div className="dashAddUser__lineRight" >
                                    <select className="dASLR__selector" name='Position' value={salaryTransferMode} onChange={(e)=>setSalaryTransferMode(e.target.value)} >
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cash">Cash</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Bank Name</p>
                                <div className="dashAddUser__lineRight" >
                                    <select className="dASLR__selector" name='Position' value={bankName} onChange={(e)=>setBankName(e.target.value)}>
                                        <option value="Al Bilad Bank">Al Bilad Bank</option>
                                        <option value="Al Inmaa Bank">Al Inmaa Bank</option>
                                        <option value="6 Months">No Bank Account yet</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dashAddUser__line">
                                <p className="dashAddUser__lineLeft">Bank Account No</p>
                                <textarea value={bankAccountNo} onChange={(e)=>setBankAccountNo(e.target.value)} placeholder='Write his Bank Account No here'  cols="30" rows="1" className="dashAddUser__lineRight" />
                            </div>
                            
                           
                        </div>
                        
                    </div>
                    
                    <div className='dashAddUser__btnDiv' ><button  className={`dashAddUser__Button  ${submitBtnPressed? 'darkBtn' : ''}`} onClick={(e)=>addNewUser(e)} >Add A New Employee</button></div>
                </div>
                    
            </div>

        </div>
    )
}

export default DashAddUser



/*

{
                  id: uid,
                  employeeName:'Ahmed Samir Mohamed AbdElKhalek Teaima',
                  shorterName:'Ahmed Samir Teaima',
                  shortest:'Ahmed Samir',
                  firstName:'Ahmed',
                  secondName:'Samir',
                  lastName:'Teaima',
                  companyId:'0002',
                  gender:'Male',
                  nationality:'Egyptian',
                  position:'Pharmacist',
                  birthDate:'05/01/1962',
                  joiningDate:'05/01/2019',
                  email:'a.teaima@greenscorners.com',
                  contacts:[{name:'ElAsar', telNo:'+20100874716', relation:'father',email:'phabosamra2055@yahoo.com'},],
                  employmentType:'Full Time',
                  paySlips:[],
                  leaves:[],
                  SalaryTransferMode:'Account Transfer',
                  bankAccountNo:'957657899383738',
                  bankName:'Alinmaa Bank',
                  propationPeriod:'3 Months',
                  vaccinated:false,
                  vaccinationDetails:{},
                  password:'987654321',
                  status:'On the Job',
                  admin:false,
              };


              {
                  id: uid,
                  employeeName:'Mahmoud ElSaid Unknown',
                  shorterName:'Mahmoud ElSaid Unknown',
                  shortest:'Mahmoud ElSaid',
                  firstName:'Mahmoud',
                  secondName:'ElSaid',
                  lastName:'Unknown',
                  companyId:'0001',
                  gender:'Male',
                  nationality:'Egyptian',
                  position:'Pharmacist',
                  birthDate:'05/01/1962',
                  joiningDate:'05/01/2019',
                  email:'m.elsayed@greenscorners.com',
                  contacts:[{name:'ElSaid', telNo:'+20100874715', relation:'father',email:'phabosamra2055@yahoo.com'},],
                  employmentType:'Full Time',
                  paySlips:[],
                  leaves:[],
                  SalaryTransferMode:'Account Transfer',
                  bankAccountNo:'957657899383738',
                  bankName:'Alinmaa Bank',
                  propationPeriod:'3 Months',
                  vaccinated:true,
                  vaccinationDetails:{},
                  password:'987654321',
                  status:'On the Job',
                  admin:true,
              };

*/