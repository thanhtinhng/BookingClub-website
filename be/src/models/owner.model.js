import  mongoose  from "mongoose";
import User from "./user.model.js";
const ownerSchema = new mongoose.Schema({
    id_card_number: { 
        type: String, 
        required: true,
        unique: true,
},
    business_license: { 
        type: String, 
        required: true 
}, // URL ảnh
    bank_info: {
    bank_name: String,
    account_number: String
},
  approval_status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
},
  verified_at: Date
});

const Owner = User.discriminator('Owner', ownerSchema);
export default Owner;