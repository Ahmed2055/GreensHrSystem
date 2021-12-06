import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    dayTimeStamp: { type: Date, required: true },
    dayType: { type: String, required: true },
    pharmacyName:{ type: String, required: true },
    firstPharmacist: { type: String,  default:'' },
    firstRemarks: { type: String,  default:'' },
    firstSales: { type: Number, required: true },
    firstShiftEnd: { type: String,  default:'' },
    secondPharmacist: { type: String,  default:'' },
    secondRemarks: { type: String,  default:'' },
    secondSales: { type: Number, required: true },
    secondShiftEnd: { type: String,  default:'' },
  },
  {
    timestamps: true,
  }
);
const Report = mongoose.model('reports', reportSchema);

export default Report;