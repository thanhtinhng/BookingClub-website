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

    const frontendUrl = process.env.FRONTEND_URL;

    if (result.success) {
      return res.redirect(
        `${frontendUrl}/payment/success?bookingStatus=${result.bookingStatus}`
      );
    }

    return res.redirect(
      `${frontendUrl}/payment/failed?code=${result.code}&message=${encodeURIComponent(result.message)}`
    );
    
  } catch (error) {
    const frontendUrl = process.env.FRONTEND_URL;

    return res.redirect(
      `${frontendUrl}/payment/failed?message=${encodeURIComponent(error.message)}`
    );
  }
}
