import fs from "fs";
import SportComplex from "../models/sport_complex.model.js";
import PricingRule from "../models/pricing_rule.model.js";
import SubField from "../models/sub_field.model.js";
import ImageField from "../models/field_image.model.js";
import { connectDB } from "../config/db.js";
import dotenv from 'dotenv';
import Owner from "../models/owner.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import BookingDetails from "../models/booking_details.model.js";
import FieldTypeConfig from "../models/field_type_configs.model.js";
dotenv.config();
const importData = async () => {
    try{
        await connectDB();

        const data = JSON.parse(fs.readFileSync("./src/scripts/data.json", "utf-8"));
        // 1. XÓA TRƯỚC
    await BookingDetails.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();
    await SubField.deleteMany();
    await PricingRule.deleteMany();
    await ImageField.deleteMany();
    await SportComplex.deleteMany();
    await User.deleteMany(); // Owner cũng nằm trong đây
    await FieldTypeConfig.deleteMany();
    // 2. INSERT THEO THỨ TỰ

    // User + Owner (discriminator tự xử)
    await User.create(data.User);

    await SportComplex.create(data.SportComplex);
    await FieldTypeConfig.create(data.FieldTypeConfig);
    await SubField.create(data.SubField);
    await ImageField.create(data.FieldImage);
    await PricingRule.create(data.PricingRule);

    await Booking.create(data.Booking);
    await BookingDetails.create(data.BookingDetails);
    await Review.create(data.Review);


        console.log("Du lieu da duoc import thanh cong!");
        process.exit(0);
    }
    catch(error){
        console.error("Loi khi import du lieu:", error);
        process.exit(1);
    }
};

importData();