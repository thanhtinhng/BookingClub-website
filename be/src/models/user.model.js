import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{9,11}$/
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["Active", "Banned", "Pending"],
    default: "Active"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
