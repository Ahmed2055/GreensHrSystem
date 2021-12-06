import mongoose from 'mongoose';

const pharmacySchema = new mongoose.Schema(
  {
    pharmacyAddress: { type: String, required: true },
    pharmacyName: { type: String, required: true },
    pharmacyNo: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);
const Pharmacy = mongoose.model('pharmacies', pharmacySchema);

export default Pharmacy;