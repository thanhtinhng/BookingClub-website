import { getMeService } from "../services/user.service.js";

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // lấy từ token

    const user = await getMeService(userId);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
