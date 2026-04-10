import { registerService, loginService } from "../services/auth.service.js";
import { validatePassword } from "../validators/validate.js";

const mockToken = () => "fake-token-" + Date.now();

export const register = async (req, res) => {
  try {
    const { phone, password, email } = req.body;

    if (!phone || !password || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password not strong enough"
      });
    }

    const user = await registerService({ phone, password, email });

    return res.json({
      user,
      accessToken: mockToken(),
      refreshToken: mockToken()
    });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await loginService({ phone, password });

    return res.json({
      _id: user._id,
      phone: user.phone,
      email: user.email,
      status: user.status,
      accessToken: mockToken(),
      refreshToken: mockToken()
    });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
