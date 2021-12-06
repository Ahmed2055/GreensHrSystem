export const initialState = {
    user : {
        employeeName:'Please, Sign In first',
        shorterName:'',
        shortest:'',
        firstName:'',
        secondName:'',
        lastName:'',
        companyId:'',
        gender:'Male',
        nationality:'Egyptian',
        position:'Pharmacist',
        birthDate:'05/01/1962',
        joiningDate:'05/01/2019',
        email:'',
        currentPharmacy:'',
        contacts:[{name:'', telNo:'+', relation:'',email:''},],
        employmentType:'Full Time',
        paySlips:[],
        leaves:[],
        SalaryTransferMode:'Account Transfer',
        bankAccountNo:'957657899383738',
        bankName:'Alinmaa Bank',
        propationPeriod:'3 Months',
        vaccinated:true,
        vaccinationDetails:{},
        password:'not available from reducer',
        status:'On the Job',
        admin:false,
    },
    userLeaves:[],
    paySlips:[],
};


export const actionTypes = {
        SET_USER :'SET_USER',
        EDIT_USER :'EDIT_USER',
        ADD_LEAVE :'ADD_LEAVE',
        SET_USER_LEAVES :'SET_USER_LEAVES',
        SET_USER_PAYSLIPS :'SET_USER_PAYSLIP',
    };





const reducer = (state, action) => {
    console.log(action);
    
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.EDIT_USER:
            return {
                ...state,
                user: action.user,
            }
        case actionTypes.ADD_LEAVE:
            const editedUser = action.user
            editedUser.leaves.push(action.addedLeave)
            return {
                ...state,
                user: editedUser,
            }
        case actionTypes.SET_USER_LEAVES:
            return {
                ...state,
                userLeaves: action.userLeaves,
            };
        case actionTypes.SET_USER_PAYSLIPS:
            return {
                ...state,
                paySlips: action.paySlips,
            };
        default:
            return state;

    }
};

export default reducer; 

