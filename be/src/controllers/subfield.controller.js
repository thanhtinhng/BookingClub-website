import e from "express";
import { CalculatePrice } from "../services/subfield.service.js";

const getCalculatePrice = async (req, res) => {
    try {
        const { subField_id, playDate, startTime, endTime } = req.body;
        const price = await CalculatePrice(subField_id, playDate, startTime, endTime);
        return res.json({ price });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

export { getCalculatePrice };