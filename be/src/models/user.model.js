import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
    default: null,
    unique: true,
    sparse: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  email_verify_token_hash: {
    type: String,
    default: null
  },
  email_verify_token_expires_at: {
    type: Date,
    default: null
  },
  reset_password_token_hash: {
    type: String,
    default: null
  },
  reset_password_token_expires_at: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ["Active", "Banned", "Pending"],
    default: "Active"
  },
  role: {
    type: String,
    enum: ["Admin", "User", "Owner", "Guest"],
    default: "User"
  },
  avatar_url: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, { discriminatorKey: 'role' });

export default mongoose.model("User", userSchema);
