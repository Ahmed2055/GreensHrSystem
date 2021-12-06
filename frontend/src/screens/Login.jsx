import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { Link , useHistory} from 'react-router-dom'
import Cookies from 'js-cookie';
import companyLogo from '../pics/companyLogo.png'
import Axios from '../store/axios';




function Login() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('a.teaima@greenscorners.com')
    const [password, setPassword] = useState('654321')

    const [forgetMsgActive, setForgetMsgActive ] = useState(false)
    const [newEmpMsgActive, setNewEmpMsgActive ] = useState(false)
    const [submitBtnPressed, setSubmitBtnPressed] = useState(false)

    const submitHandler = ()=>{
    Axios.post('/api/users/signin', { email:email, password:password })
      .then((response) => {
        const data = response.data
        dispatch(setUser(data))
        Cookies.set('greensUserInfo', `${JSON.stringify(data)}`, {expires: 7, path: '/' });
        console.log(JSON.parse(JSON.stringify(data)))
        history.push('/')
      }).catch(error => {
        console.log(error);
      });

    }


    
    return (
        <div className='login'>
            <div className="login__logo">
                <img src={companyLogo} alt="" className="login__logoPic" />
            </div>
            <div className="loginBox"  >
                <p className="loginBox__text">Sign in with your credentials</p>
                <input className='loginBox__input' id="email" required placeholder='E-mail' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input className='loginBox__input' id="password" required placeholder='Password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <div className="loginBox__buttons">
                    <button type='submit' onClick={()=>submitHandler()} className={`loginBox__loginSubmit   ${submitBtnPressed? 'darkBtn' : ''}`}  >Login</button>
                    <div className="loginBox__buttonsInside">
                        <div  className={`loginBox__passwordResetLink `}   ><p className={`loginBox__passwordReset ${forgetMsgActive? 'mainDarkColor' : ''}`}>Forgot Password?</p></div>
                        <div  className={`loginBox__passwordResetLink `}   ><p className={`loginBox__passwordReset ${newEmpMsgActive? 'mainDarkColor' : ''}`}>New Employee?</p></div>
                    </div>
                </div>
                <div className={`loginBox__Msg ${forgetMsgActive? '': 'hidden'}`}  > Please, mail a.teaima@greenscorners.com from your official email and include a new suggested Password </div>
                <div className={`loginBox__Msg ${newEmpMsgActive? '': 'hidden'}`} > Please, contact your manager to set up a new account</div>
            </div>

        </div>
    )
}

export default Login;


/*





/*

css -style expanded   compact  compressed

*/
