import axios from "../utils/axios.customize";

interface BookingDetailPayload {
  sub_field_id: string;
  play_date: string;
  startTime: string;
  endTime: string;
  services: string[];
}

export interface CreateBookingPayload {
  complex_id: string;
  booking_date: string;
  booking_details: BookingDetailPayload[];
}

interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    user_id: string;
    complex_id: string;
  };
}

export const createBookingApi = (
  payload: CreateBookingPayload
): Promise<CreateBookingResponse> => {
  return axios.post("/api/v1/bookings", payload);
};

interface CreatePaymentResponse {
  paymentUrl: string;
}

export const createVnpayPaymentApi = (
  bookingId: string
): Promise<CreatePaymentResponse> => {
  return axios.post(`/api/v1/bookings/${bookingId}/payments/vnpay`);
};
