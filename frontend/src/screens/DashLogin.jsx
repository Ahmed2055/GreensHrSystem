import React, {useState, useEffect} from 'react'
import { Link , useHistory} from 'react-router-dom'
import companyLogo from '../pics/companyLogo.png'
import {auth,provider} from '../store/firebase'
import firebase from 'firebase'
import { useStateValue } from '../store/StateProvider';
import Cookies from 'js-cookie';

function DashLogin() {

    const [state, dispatch] = useStateValue();
    const history = useHistory();
    const [email, setEmail] = useState('m.elsayed$@greenscorners.com')
    const [password, setEPassword] = useState('987654321')

    const [submitBtnPressed, setSubmitBtnPressed] = useState(false)

    const handleLogin = (e)=>{
        e.preventDefault();
        const editedEmail = email.replace('$','')
        const editedPassword = password.replace('$','')
        if(email !== 'm.elsayed$@greenscorners.com' && email.indexOf('$') !== 9 ){
            alert('You are not authorized to sign in to this Platform');
        }else{
            setSubmitBtnPressed(true)
        firebase
        .auth()
        .signInWithEmailAndPassword(editedEmail.trim(), editedPassword)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    console.log(user)
                    alert('Logged in Successfully')
                    dispatch({
                        type:  'SET_USER',
                        user: user,
                    })
                    Cookies.set('email', `${user.email}`, {expires: 0.1, path: '/' });
                    Cookies.set('password', `${user.password}`, {expires: 0.1, path: '/' });
                    Cookies.set('companyId', `${user.companyId}`, {expires: 0.1, path: '/' });
                    Cookies.set('uid', `${user.uid}`, {expires: 0.1, path: '/' });
                })
                .then( ()=> {history.push('/dashHome')})
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            setSubmitBtnPressed(false)
            alert(error)
        })
        }
    }
    return (
        <div className='dashLogin'>
            <div className="login__logo">
                <img src={companyLogo} alt="" className="login__logoPic" />
            </div>
            <div className="loginBox" >
                <p className="loginBox__text">Sign in with your credentials</p>
                <input className='loginBox__input' placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input className='loginBox__input' placeholder='Password' type='password' value={password}  onChange={(e)=>setEPassword(e.target.value)} />
                <div className="loginBox__buttons">
                    <button type='submit' className={`loginBox__loginSubmit  ${submitBtnPressed? 'darkBtn' : ''}`} onClick={(e)=>handleLogin(e)} >Login</button>
                </div>
                
            </div>
        </div>
    )
}

export default DashLogin
