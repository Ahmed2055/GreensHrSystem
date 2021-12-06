import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    basicPay: { type: Number, required: true },
    campaigns:{ type: Number, required: true },
    deductions:{ type: Number, required: true },
    fixedOverTime:{ type: Number, required: true },
    housingAllowance:{ type: Number, required: true },
    incentives:{ type: Number, required: true },
    netPay:{ type: Number, required: true },
    otherIncentives:{ type: Number, required: true },
    overTimeAllowance:{ type: Number, required: true },
    overTimeHours:{ type: Number, required: true },
    overTimeRate:{ type: Number, required: true },
    percentage:{ type: Number, required: true },
    ticketsAllowance:{ type: Number, required: true },
    transportAllowance:{ type: Number, required: true },
    remarks:{ type: String },    
    month: { type: Date, required: true },
    generalRemarks:{ type: String },
    salaryOf:{ type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Payroll = mongoose.model('payrolls', payrollSchema);

export default Payroll;