import { getMeService, updateMeService, updatePasswordService } from "../services/user.service.js";

const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // lấy từ token

    const user = await getMeService(userId);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const userId = req.user.id; // lấy từ token
    const { name, avatar_url, date_of_birth } = req.body;
    // Call the service to update the user
    const updatedUser = await updateMeService(userId, { name, avatar_url, date_of_birth });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id; // lấy từ token
    const { currentPassword, newPassword, confirmPassword } = req.body;
    // Call the service to update the password
    await updatePasswordService(userId, currentPassword, newPassword, confirmPassword);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getMe, updateMe, updatePassword };