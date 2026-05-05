import jwt from "jsonwebtoken";

const publicRoutes = [
    { method: "POST", path: "/api/v1/register" },
    { method: "POST", path: "/api/v1/login" },
    { method: "POST", path: "/api/v1/refresh" },
    { method: "POST", path: "/api/v1/verify-email" },
    { method: "GET", path: "/api/v1/verify-email" },
    { method: "POST", path: "/api/v1/resend-verification-email" },
    { method: "POST", path: "/api/v1/forgot-password" },
    { method: "POST", path: "/api/v1/reset-password" },

    { method: "GET", path: "/api/v1/reviews" },
    { method: "GET", path: "/api/v1/reviews/with-stats" },
    { method: "GET", path: "/api/v1/reviews/" }, // để match /reviews/:id


    { method: "GET", path: "/api/v1/sportcomplex" },
    { method: "GET", path: "/api/v1/sportcomplex/" }, // để match /sportcomplex/:slug

    { method: "GET", path: "/api/v1/payments/vnpay/return" },
];

const isPublicRoute = (req) => {
    const requestPath = req.originalUrl.split("?")[0];

    return publicRoutes.some((route) => {
        if (route.method !== req.method) return false;

        // match exact
        if (route.path === requestPath) return true;

        // match dynamic route (ví dụ /reviews/:id)
        if (route.path.endsWith("/") && requestPath.startsWith(route.path)) {
            return true;
        }

        return false;
    });
};

const auth = (req, res, next) => {

    if (isPublicRoute(req)) {
        return next();
    }

    try {
        const token = req.cookies?.access_token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        return next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid/Expired token",
        });
    }
};

export default auth;
