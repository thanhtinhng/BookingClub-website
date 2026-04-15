import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    const white_lists = ["/", "/register", "/login", ""] //bỏ qua kiểm tra những uri này

    if (white_lists.find(item => '/api' + item === req.originalUrl)) {
        next()
    } else {
        if (req.headers && req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];

                const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode token

                // lưu thông tin user vào request
                req.user = decoded;

                next()
            } catch (error) {
                return res.status(401).json({ message: "Invalid token/Expired token" });
            }
        } else {
            return res.status(401).json({ message: "Invalid token/Expired token" });
        }
    }


}

export default auth;
