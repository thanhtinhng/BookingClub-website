import e from "express";
import { CalculatePrice, getAvailableTimeSlots } from "../services/subfield.service.js";

const getCalculatePrice = async (req, res) => {
    try {
        const { subField_id, playDate, startTime, endTime } = req.body;
        const price = await CalculatePrice(subField_id, playDate, startTime, endTime);
        return res.json({ price });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const getAvailableSlots = async (req, res) => {
    try {
        const { subField_id } = req.params;
        const { playDate } = req.query;
        const timeSlots = await getAvailableTimeSlots(subField_id, playDate);
        return res.json({ timeSlots });

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

export { getCalculatePrice, getAvailableSlots };