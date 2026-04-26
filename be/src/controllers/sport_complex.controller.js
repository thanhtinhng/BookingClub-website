import { getSportComplexDetailsService } from "../services/sport_complex.service.js";

export const getSportComplexDetails = async (req, res) => {
    try {
        const { slug } = req.params;
        const data = await getSportComplexDetailsService(slug);
        return res.json(data);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

