import fs from "fs";
import SportComplex from "../models/sport_complex.model.js";
import PricingRule from "../models/pricing_rule.model.js";
import SubField from "../models/sub_field.model.js";
import ImageField from "../models/field_image.model.js";
import { connectDB } from "../config/db.js";
import dotenv from 'dotenv';

dotenv.config();
const importData = async () => {
    try{
        await connectDB();

        const data = JSON.parse(fs.readFileSync("./src/scripts/data.json", "utf-8"));

        await SportComplex.deleteMany();
        await PricingRule.deleteMany();
        await SubField.deleteMany();
        await ImageField.deleteMany();

        await SportComplex.create(data.SportComplex);
        await PricingRule.create(data.PricingRule);
        await SubField.create(data.SubField);
        await ImageField.create(data.FieldImage);
        console.log("Du lieu da duoc import thanh cong!");
        process.exit(0);
    }
    catch(error){
        console.error("Loi khi import du lieu:", error);
        process.exit(1);
    }
};

importData();