import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: String,
  age: Number,
  gender: String,
  description: String,
  location: String, 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  healthRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: "HealthRecord" },
  ],
  appointments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "appointment" },
  ],
  potentialMates: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
});
export default mongoose.model("Pet", petSchema);
