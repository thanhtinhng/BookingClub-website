import {
    createBooking,
    cancelBookingBeforePay
} from "../services/booking.service.js";

export const createBookingController = async (req, res) => {
    try {
        const booking = await createBooking(req.user.id, req.body);

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const cancelBookingController = async (req, res) => {
    try {
        const booking = await cancelBookingBeforePay(
            req.params.bookingId,
            req.user.id
        );

        return res.json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// req cho phần create booking (tui chưa nối với FE nên note tạm ở đây, pull rq sau tui xóa)
// {
//     "complex_id": "65f1a2b3c4d5e6f7a8b90123",
//     "booking_date": "2026-05-07",
//     "total_price": 725000,
//     "booking_details": [
//         {
//             "sub_field_id": "65f1b1b1b1b1b1b1b1b1b106",
//             "play_date": "2026-05-08",
//             "startTime": "17:30",
//             "endTime": "18:30",
//             "services": [
//                 {
//                     "id": "referee",
//                     "name": "Thuê trọng tài",
//                     "price": 200000
//                 }
//             ]
//         },
//         {
//             "sub_field_id": "65f1b1b1b1b1b1b1b1b1b105",
//             "play_date": "2026-05-08",
//             "startTime": "18:00",
//             "endTime": "19:00",
//             "services": []
//         }
//     ]
// }
