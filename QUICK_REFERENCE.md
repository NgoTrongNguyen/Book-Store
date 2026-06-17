# ⚡ BookStore - Quick Reference Guide

## 🎯 Bắt Đầu Nhanh (3 Bước)

### 1️⃣ Cài Đặt Docker
- Tải: https://www.docker.com/products/docker-desktop
- Cài đặt và khởi động

### 2️⃣ Chạy Dự Án
```bash
cd bookstore-app
docker-compose up --build
```

### 3️⃣ Mở Trình Duyệt
- Frontend: http://localhost:3000 ✅
- API: http://localhost:5000/api ✅
- Database: localhost:5432 (pgAdmin optional)

---

## 📱 Website Features

| Feature | URL |
|---------|-----|
| **Trang Chủ** | / |
| **Chi Tiết Sách** | Nhấp vào "Chi Tiết" |
| **Đặt Trước** | Nhấp vào "Đặt Trước" |
| **Tìm Kiếm** | Thanh tìm kiếm trên cùng |
| **Đánh Giá** | Ở trang chi tiết sách |

---

## 🔌 API Quick Reference

### Tất Cả Sách
```bash
curl http://localhost:5000/api/books
```

### Tìm Kiếm Sách
```bash
curl "http://localhost:5000/api/search?q=Python"
```

### Đặt Trước Sách
```bash
curl -X POST http://localhost:5000/api/pre-orders \
  -H "Content-Type: application/json" \
  -d '{
    "book_id": 1,
    "customer_name": "Nguyễn Văn A",
    "customer_email": "nguyenvana@example.com",
    "customer_phone": "0912345678",
    "quantity": 1,
    "delivery_address": "123 Hà Nội"
  }'
```

### Lấy Thống Kê
```bash
curl http://localhost:5000/api/admin/stats
```

---

## 📂 Các File Quan Trọng

| File | Mục Đích |
|------|---------|
| docker-compose.yml | Cấu hình Docker |
| init.sql | Dữ liệu database |
| backend/server.js | API server |
| frontend/src/App.js | React chính |
| README.md | Tài liệu đầy đủ |
| API_DOCUMENTATION.md | API docs |

---

## 🗂️ Cấu Trúc Project

```
bookstore-app/
├── docker-compose.yml      🐳 Docker config
├── init.sql               📊 Database data
├── README.md              📖 Documentation
├── INSTALLATION.md        🚀 Setup guide
├── API_DOCUMENTATION.md   🔌 API reference
│
├── backend/               🔧 Express server
│   ├── server.js         
│   ├── package.json
│   └── Dockerfile
│
└── frontend/              🎨 React app
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── components/
    │       ├── Header.js
    │       ├── BookList.js
    │       ├── BookDetail.js
    │       ├── PreOrderForm.js
    │       └── Footer.js
    └── package.json
```

---

## 💻 Database Credentials

```
Hostname: localhost (hoặc postgres khi dùng Docker)
Port: 5432
Username: bookadmin
Password: securepassword123
Database: bookstore
```

### Test Database Connection
```bash
# Ngoài Docker
psql -h localhost -U bookadmin -d bookstore

# Trong Docker
docker-compose exec postgres psql -U bookadmin -d bookstore
```

---

## 📊 Database Tables

### books (8 sách mẫu)
- Những Người Khó Tính
- Chuyến Đi Vòng Quanh Thế Giới
- Dạy Con Giỏi
- Thói Quen Nguyên Tử
- Đắc Nhân Tâm
- Cuộc Sống Pi
- Tư Duy Nhanh Và Chậm
- 1984

### pre_orders
- Lưu tất cả đơn đặt trước
- Tracking status: pending → confirmed → shipped → delivered

### reviews
- Đánh giá 5 sao
- Bình luận từ độc giả

---

## 🎨 Website Colors

| Màu | Hex | Sử Dụng |
|-----|-----|--------|
| Chính | #667eea | Buttons, headings |
| Phụ | #764ba2 | Backgrounds |
| Thành công | #d4edda | Success messages |
| Lỗi | #f8d7da | Error messages |
| Text | #333 | Body text |

---

## 🔧 Lệnh Hữu Ích

### Docker Commands
```bash
# Khởi động
docker-compose up

# Build lại
docker-compose up --build

# Dừng
docker-compose stop

# Xóa (giữ database)
docker-compose down

# Xóa tất cả (xóa database)
docker-compose down -v

# Xem logs
docker-compose logs

# Xem logs backend
docker-compose logs backend

# Xem logs database
docker-compose logs postgres
```

### Database Commands
```bash
# Kết nối
docker-compose exec postgres psql -U bookadmin -d bookstore

# Xem bảng
\dt

# Xem dữ liệu
SELECT * FROM books;

# Thoát
\q
```

---

## 🚨 Troubleshooting

### Port 5000 đã sử dụng
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Database connection failed
```bash
# Kiểm tra logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Frontend không kết nối API
```bash
# Kiểm tra backend
curl http://localhost:5000/api/health

# Xem logs
docker-compose logs backend
```

---

## 📚 Documentation

| Document | Nội Dung |
|----------|---------|
| README.md | Tổng quan + hướng dẫn |
| INSTALLATION.md | Setup từng bước |
| API_DOCUMENTATION.md | Tất cả endpoints |
| PROJECT_SUMMARY.md | Danh sách files |

---

## ✅ Checklist

- [ ] Cài Docker
- [ ] Clone repository
- [ ] Chạy docker-compose up --build
- [ ] Mở http://localhost:3000
- [ ] Xem danh sách sách
- [ ] Tìm kiếm sách
- [ ] Xem chi tiết sách
- [ ] Để lại đánh giá
- [ ] Đặt trước sách
- [ ] Kiểm tra API tại http://localhost:5000/api

---

## 🎓 Learning Paths

### Frontend Developer
1. Xem App.js structure
2. Tìm hiểu components
3. Xem App.css styling
4. Test API calls

### Backend Developer
1. Xem server.js
2. Hiểu endpoints
3. Xem database schema
4. Test queries

### DevOps Engineer
1. Xem docker-compose.yml
2. Hiểu containers
3. Test networking
4. Setup volumes

### Full Stack
1. Đọc README.md
2. Setup Docker
3. Chạy project
4. Tìm hiểu code

---

## 🔐 Security

- ✅ Validation dữ liệu
- ✅ Email check
- ✅ SQL injection prevention
- ✅ CORS configured
- ✅ Environment variables

---

## 📞 Need Help?

1. **Kiểm tra** → INSTALLATION.md
2. **API Questions** → API_DOCUMENTATION.md
3. **Code Issues** → Xem comments trong file
4. **Database** → Xem init.sql
5. **Full Info** → README.md

---

## 🎉 Bạn Đã Sẵn Sàng!

Bây giờ bạn có:
- ✅ Hoàn chỉnh React frontend
- ✅ Express.js backend
- ✅ PostgreSQL database
- ✅ Docker setup
- ✅ Sample data
- ✅ Full documentation

**Chúc mừng! Hãy bắt đầu coding! 🚀**

---

**Last Updated: January 2024**
**Version: 1.0.0**
