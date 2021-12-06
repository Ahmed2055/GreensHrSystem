import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import companyLogo from '../pics/companyLogo.png';
import FaceIcon from '@mui/icons-material/Face';
import {selectUser} from '../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux";

function MainHeader() {
    const history = useHistory();
    const user = useSelector(selectUser);


    return (
        <div className='mainHeader'>
            <Link to='/' className="mainHeader__logoDiv">
                <img src={companyLogo} alt="" className="mainHeader__logoImg" />
            </Link>
            <Link to='/profile' className="mainHeader__accountDiv">
                <div className="mainHeader__accountIcon"><FaceIcon color='inherit' fontSize='large' /></div>
                <p className="mainHeader__accountName">{user.employeeName}</p>
            </Link>
        </div>
    )
}

export default MainHeader
