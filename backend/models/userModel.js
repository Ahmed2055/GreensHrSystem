import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isAccountant: { type: Boolean, default: false, required: true },
    employeeName:{ type: String, required: true },
    shorterName:{ type: String, required: true },
    shortestName:{ type: String, required: true },
    currentPharmacy: { type: String, required: true },  
    firstName:{ type: String, required: true },
    secondName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    companyId:{ type: String, required: true },
    gender:{ type: String, required: true },
    nationality:{ type: String, required: true },
    position:{ type: String, required: true },
    birthDate: { type: Date, required: true },
    joiningDate: { type: Date, required: true },
    telNo: { type: String, required: true },
    contacts: { type: Array, required: true, default:[] },
    employmentType: { type: String, required: true },
    paySlips: { type: Array, required: true, default: [] },
    leaves: { type: Array, required: true, default: [] },
    SalaryTransferMode:{ type: String, required: true },
    bankAccountNo:{ type: String, required: true },
    bankName:{ type: String, required: true },
    propationPeriod:{ type: String, required: true },
    vaccinated:{ type: Boolean, required: true, default: false },
    vaccinationDetails:{ type: Object, required: true, default:{} },
    status:{ type: String, required: true, default: 'On the Job' },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('users', userSchema);

export default User;


/*



*/