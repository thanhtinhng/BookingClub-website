import jwt from "jsonwebtoken";

const publicRoutes = [
    { method: "POST", path: "/api/register" },
    { method: "POST", path: "/api/login" },
    { method: "POST", path: "/api/verify-email" },
    { method: "GET", path: "/api/verify-email" },
    { method: "POST", path: "/api/resend-verification-email" },
    { method: "POST", path: "/api/forgot-password" },
    { method: "POST", path: "/api/reset-password" },

    { method: "GET", path: "/api/reviews" },
    { method: "GET", path: "/api/reviews/with-stats" },
    { method: "GET", path: "/api/reviews/" }, // để match /reviews/:id

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

    // bỏ qua nếu là public route
    if (isPublicRoute(req)) {
        return next();
    }

    // check token
    if (req.headers && req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;

            return next();
        } catch (error) {
            return res.status(401).json({
                message: "Invalid token/Expired token",
            });
        }
    }

    return res.status(401).json({
        message: "Unauthorized",
    });


}

export default auth;
