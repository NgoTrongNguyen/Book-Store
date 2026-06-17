import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Về Chúng Tôi</h3>
          <ul>
            <li><a href="#about">Giới Thiệu</a></li>
            <li><a href="#mission">Sứ Mệnh</a></li>
            <li><a href="#team">Đội Ngũ</a></li>
            <li><a href="#contact">Liên Hệ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Dịch Vụ</h3>
          <ul>
            <li><a href="#pre-order">Đặt Trước</a></li>
            <li><a href="#shipping">Vận Chuyển</a></li>
            <li><a href="#returns">Hoàn Trả</a></li>
            <li><a href="#faq">Câu Hỏi Thường Gặp</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Chính Sách</h3>
          <ul>
            <li><a href="#privacy">Chính Sách Bảo Mật</a></li>
            <li><a href="#terms">Điều Khoản Sử Dụng</a></li>
            <li><a href="#cookies">Cookie</a></li>
            <li><a href="#payment">Thanh Toán</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Liên Hệ</h3>
          <ul>
            <li><a href="mailto:contact@bookstore.com">✉️ contact@bookstore.com</a></li>
            <li><a href="tel:+84123456789">📞 +84 (123) 456-789</a></li>
            <li><a href="#address">📍 Hà Nội, Việt Nam</a></li>
            <li><a href="#hours">⏰ Mở cửa: 9h - 18h</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 BookStore Vietnam. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}

export default Footer;
