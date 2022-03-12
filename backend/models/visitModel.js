import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    evaluatingManager: { type: String, required: true },
    evaluatedPharmacy: { type: String, required: true },
    evaluatedPharmacistId: { type: String, required: true },
    evaluationType: { type: String, required: true },
    generalRemarks: { type: String },

    pharmacyHygienicMeasures:{ type: Object, required: true },
    counterHygienicMeasures:{ type: Object, required: true },
    pricing:{ type: Object, required: true },
    temperatureRegistration:{ type: Object, required: true },
    merchandizing:{ type: Object, required: true },
    offersDisplay:{ type: Object, required: true },
    officialDocumentsOrganized:{ type: Object, required: true },
    availabiltyFollowUp:{ type: Object, required: true },
    expiryFollowUp:{ type: Object, required: true },
    randomStockTake:{ type: Object, required: true },

    personalHygienicMeasures:{ type: Object, required: true },
    formalWear:{ type: Object, required: true },
    dataAwareness:{ type: Object, required: true },
    communicationSkills:{ type: Object, required: true },
    CustomerService:{ type: Object, required: true },
    
  },
  {
    timestamps: true,
  }
);
const Visit = mongoose.model('visits', visitSchema);

export default Visit;