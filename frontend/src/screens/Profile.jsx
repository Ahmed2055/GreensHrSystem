import React, {useState, useEffect} from 'react'
import LocationHeader from '../components/LocationHeader'
import MainHeader from '../components/MainHeader'
import SecondHeader from '../components/SecondHeader'
import unKnownPic from '../pics/unknownPic.jpg';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link , useHistory} from 'react-router-dom'
import EmergencyContactInfo from '../components/EmergencyContactInfo';
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';

function Profile() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [activeTab, setActiveTab]  = useState('pi')
    const [personalPic, setPersonalPic]  = useState(user.companyId)

    const getPersonalPic = ()=>{
        var result =  user.companyId;
        console.log(result)
        return result;
    }


    return (
        <div className='profile'>
            <MainHeader />
            <SecondHeader />
            <LocationHeader  location='Employee Profile' />

            <div className="profileContainer">
                <div className="profileContainer__imageDiv">
                    <img src={unKnownPic} alt="" className="profileContainer__image" />
                    <h4 className="profileContainer__name">{user.employeeName}</h4>
                    <h6 className="profileContainer__position">{user.position}</h6>
                </div>

                <div className="profileContainer__details">
                    <div className="profileDetails__title">
                        <div className="profileDetails__titleLeft">
                            <AssignmentIcon color='inherit'  />
                            <h3 className="profileDetails__titleText">Employee Profile </h3>
                        </div>
                        <div className="profileDetails__tabs" >
                            <a className={`profileDetails__tab ${activeTab ==='pi'? 'activeTab' : '' }`} onClick={()=>setActiveTab('pi')} > Personal Info </a>
                            <a className={`profileDetails__tab ${activeTab ==='c'? 'activeTab' : '' }`} onClick={()=>setActiveTab('c')} > Contacts </a>
                        </div>
                    </div>
                    {activeTab==='pi' ? 
                    <div className="profileDetails__personalInfo">
                        <div className="profileDetails__personalInfoTitle">Profile Information</div>
                        <div className="profileDetails__personalInfoBody">
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Employee ID</p>
                                <p className="profileDetails__personalInfoData">{user.companyId}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Employee Name</p>
                                <p className="profileDetails__personalInfoData">{user.employeeName}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Date of Birth</p>
                                <p className="profileDetails__personalInfoData">{new Date(user.birthDate).toLocaleDateString()}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Date of Join</p>
                                <p className="profileDetails__personalInfoData">{new Date(user.joiningDate).toLocaleDateString()}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Payroll Start Date</p>
                                <p className="profileDetails__personalInfoData">{new Date(user.joiningDate).toLocaleDateString()}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Nationality</p>
                                <p className="profileDetails__personalInfoData">{user.nationality}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Current Pharmacy</p>
                                <p className="profileDetails__personalInfoData">{user.currentPharmacy}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Probation Period</p>
                                <p className="profileDetails__personalInfoData">{user.propationPeriod}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Employment Type</p>
                                <p className="profileDetails__personalInfoData">{user.employmentType}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Official Email</p>
                                <p className="profileDetails__personalInfoData">{user.email}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Salary Transfer Mode</p>
                                <p className="profileDetails__personalInfoData">{user.SalaryTransferMode}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Account Number</p>
                                <p className="profileDetails__personalInfoData">{user.bankAccountNo}</p>
                            </div>
                            <div className="profileDetails__personalInfoDetail">
                                <p className="profileDetails__personalInfoText">Bank Name</p>
                                <p className="profileDetails__personalInfoData">{user.bankName}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="profileDetails__personalInfo">
                        <div className="homeContainer__ResponsiveComponent"><EmergencyContactInfo  /></div>
                    </div>
                    
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
