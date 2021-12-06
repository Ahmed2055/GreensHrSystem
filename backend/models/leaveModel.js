import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema(
  {
    requesterId: { type: String, required: true },
    requesterName: { type: String, required: true },
    requesterShortestName:{ type: String, required: true },
    requesterEmail:{ type: String, required: true },
    status:{ type: String, required: true , default: 'Pending' },    
    dateRejoined: { type: Date},
    daysLate: { type: Number, required: true, default: 0 },
    dateFrom:{ type: String, required: true },
    dateTo:{ type: String, required: true },
    natureLeave:{ type: String, required: true },
    applyDate:{ type: String, required: true },
    natureLeave:{ type: String, required: true },
    realDaysLeave:{ type: Number, required: true },
    maxDaysLeave:{ type: Number, required: true },
    outsideTravelling:{ type: Boolean, required: true, default: false },
    comment:{ type: String, default: 'On the Job' },
    dateRejoinRequest:{ type: String, default: undefined },
    dateRejoinRequestStatus:{ type: String, default: undefined },
  },
  {
    timestamps: true,
  }
);
const Leave = mongoose.model('leaves', leaveSchema);

export default Leave;