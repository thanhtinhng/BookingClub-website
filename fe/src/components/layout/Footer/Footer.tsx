import "./Footer.css";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

export default function Footer() {
    return (
    <footer className="footer">
        <div className="footer-container">
        <div className="footer-top">
            <div className="footer-brand">
            <h2>UIT-BookingClub</h2>

            <p>
                Nền tảng đặt sân thể thao trực tuyến
                <br />
                nhanh chóng, tiện lợi cho mọi người.
            </p>

            <div className="social-icons">
                <a href="/">
                <FaFacebookF />
                </a>

                <a href="/">
                <FaTwitter />
                </a>

                <a href="/">
                <FaInstagram />
                </a>
            </div>
            </div>

            <div className="footer-links">
            <div className="footer-column">
                <h4>Về chúng tôi</h4>

                <a href="/">Cách đặt sân</a>
                <a href="/courts/search">Danh sách sân</a>
                <a href="/">Đối tác sân thể thao</a>
                <a href="/">Liên hệ</a>
            </div>

            <div className="footer-column">
                <h4>Cộng đồng</h4>

                <a href="/">Sự kiện thể thao</a>
                <a href="/">Tin tức</a>
                <a href="/">Hướng dẫn sử dụng</a>
                <a href="/">Mời bạn bè</a>
            </div>

            <div className="footer-column">
                <h4>Theo dõi</h4>

                <a href="/">Discord</a>
                <a href="/">Instagram</a>
                <a href="/">Twitter</a>
                <a href="/">Facebook</a>
            </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>©2026 UIT-BookingClub. All rights reserved.</p>

            <div className="footer-bottom-links">
            <a href="/">Chính sách bảo mật</a>
            <a href="/">Điều khoản sử dụng</a>
            </div>
        </div>
        </div>
    </footer>
    );
}
