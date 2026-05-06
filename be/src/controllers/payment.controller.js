import {
  createVnpayPayment,
  handleVnpayReturn,
} from "../services/payment.service.js";

export const createPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const paymentUrl = await createVnpayPayment(
      bookingId,
      req.user.id
    );

    return res.json({
      paymentUrl,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export const checkPayment = async (req, res) => {
  try {
    const result = await handleVnpayReturn(req.query);

    return res.json({
      message: "Payment processed",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
