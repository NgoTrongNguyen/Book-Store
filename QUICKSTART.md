# 🚀 Quick Start Guide

## 1️⃣ Chạy Backend (Express Server)

```bash
# Bước 1: Vào thư mục backend
cd backend

# Bước 2: Cài đặt dependencies
npm install

# Bước 3: Chạy server
npm start

# ✅ Bạn sẽ thấy:
# Server running on port 3000
# Environment: development
```

**Server sẽ chạy tại:** `http://localhost:3000`

---

## 2️⃣ Chạy Frontend (Static Files)

### Cách 1: Sử dụng VS Code Live Server
1. Mở folder `frontend` trong VS Code
2. Click chuột phải vào `index.html`
3. Chọn "Open with Live Server"
4. ✅ Browser tự động mở

### Cách 2: Sử dụng Python HTTP Server
```bash
cd frontend
python -m http.server 5000
# ✅ Mở http://localhost:5000
```

### Cách 3: Sử dụng Node http-server
```bash
cd frontend
npx http-server
# ✅ Mở http://localhost:8080
```

### Cách 4: Mở trực tiếp HTML
```bash
# Từ terminal hoặc file explorer
# Double-click index.html để mở trong browser
# Lưu ý: Một số tính năng có thể không hoạt động với file:// protocol
```

---

## ✨ Thử Nghiệm

### 1. Form Pre-order
1. Điền đầy đủ thông tin
2. Click "Complete Order"
3. Xem success message

### 2. Reviews Section
1. Click tab "Reviews"
2. Xem 5 reviews mẫu được tải từ API

### 3. Author Section
1. Click tab "Author"
2. Xem thông tin tác giả Sarah Chen

---

## 🔗 API URLs (để test)

Backend API Base: `http://localhost:3000/api`

Các endpoints có thể test:
- `GET http://localhost:3000/api/health`
- `GET http://localhost:3000/api/reviews`
- `GET http://localhost:3000/api/author`
- `GET http://localhost:3000/api/book`

---

## 🐛 Nếu gặp lỗi

### ❌ CORS Error
**Lỗi:** "Access to XMLHttpRequest has been blocked by CORS policy"
**Nguyên nhân:** Frontend và Backend trên port khác
**Giải pháp:** Backend đã có CORS enabled. Kiểm tra API_URL trong `app.js` trùng khớp

### ❌ Port 3000 đã sử dụng
**Lỗi:** "EADDRINUSE: address already in use :::3000"
**Giải pháp:** Thay đổi PORT trong `.env`
```
PORT=3001
```

### ❌ API không respond
**Kiểm tra:**
1. Backend server đang chạy? (`npm start`)
2. API_URL trong `app.js` đúng?
3. Mở `http://localhost:3000/api/health` trong browser

---

## 📊 Dữ Liệu Mẫu

Ứng dụng có dữ liệu mẫu cho:
- ✓ 5 reviews
- ✓ Thông tin tác giả
- ✓ Thông tin sách

Khi submit form, dữ liệu lưu trong memory (restart server = mất dữ liệu)

---

## 🎯 Bước Tiếp Theo

### Để phát triển thêm:
1. **Database:** Thay in-memory bằng MongoDB/PostgreSQL
2. **Email:** Thêm email confirmation
3. **Authentication:** Thêm JWT/OAuth
4. **Admin Panel:** Dashboard quản lý orders
5. **Payment:** Integrate Stripe/PayPal
6. **Testing:** Thêm unit & e2e tests

---

## 📱 Responsive Design

- ✓ Desktop: Optimal layout 2 cột
- ✓ Tablet: Điều chỉnh khoảng cách
- ✓ Mobile: Layout 1 cột, fullwidth

---

## 🎉 Ready to Go!

Bạn đã có:
- ✅ Trang pre-order chuyên nghiệp
- ✅ Form validation
- ✅ API backend hoàn chỉnh
- ✅ Reviews & Author sections
- ✅ Responsive design

**Chúc bạn thành công! 🚀**

---

## 📞 Cần Giúp?

1. Kiểm tra console (Ctrl+Shift+J)
2. Xem Network tab trong DevTools
3. Kiểm tra terminal backend
4. Đọc README.md để chi tiết hơn