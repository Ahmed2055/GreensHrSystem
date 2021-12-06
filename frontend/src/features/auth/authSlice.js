import {  createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const undefinedUser =  {
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
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

const initialState = {
  user: undefinedUser 
};

try {
  const initialState = {
    user:  JSON.parse(getCookie('greensUserInfo'))  ,
  };
} catch (error) {
  console.log(error);
}




//JSON.parse(getCookie('greensUserInfo'))


  export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
    },

   
  });
  
  export const {  setUser } = authSlice.actions;
  

  export const selectUser = (state) => state.auth.user;
  


  
  export default authSlice.reducer;