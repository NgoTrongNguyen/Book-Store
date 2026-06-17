# 📖 Hướng Dẫn Cài Đặt Nhanh BookStore

## 🎯 Bước 1: Yêu Cầu Hệ Thống

Cài đặt các phần mềm cần thiết:
- **Docker Desktop** từ https://www.docker.com/products/docker-desktop
- **Git** từ https://git-scm.com

Kiểm tra cài đặt:
```bash
docker --version
docker-compose --version
```

## 🚀 Bước 2: Clone Repository

```bash
git clone <repository-url>
cd bookstore-app
```

## ⚙️ Bước 3: Chạy Ứng Dụng

### Cách 1: Sử dụng Script (Dễ nhất)

**Windows:**
```bash
# Click đúp vào start.sh hoặc chạy:
bash start.sh
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Cách 2: Sử dụng Docker Compose Trực Tiếp

```bash
docker-compose up --build
```

## 🌐 Bước 4: Truy Cập Ứng Dụng

Mở trình duyệt và truy cập:
- **Website**: http://localhost:3000
- **API**: http://localhost:5000/api/health
- **Database UI** (optional): http://localhost:5050 (nếu có pgAdmin)

## 📊 Bước 5: Kiểm Tra Database

```bash
# Kết nối vào database
docker-compose exec postgres psql -U bookadmin -d bookstore

# Xem danh sách bảng
\dt

# Xem dữ liệu sách
SELECT * FROM books;

# Thoát
\q
```

## ✅ Bước 6: Kiểm Tra Các API

```bash
# Lấy danh sách sách
curl http://localhost:5000/api/books

# Lấy chi tiết sách đầu tiên
curl http://localhost:5000/api/books/1

# Tìm kiếm sách
curl "http://localhost:5000/api/search?q=Python"

# Kiểm tra health
curl http://localhost:5000/api/health
```

## 🐛 Khắc Phục Sự Cố

### Lỗi: "Port 5000 đã được sử dụng"

```bash
# Trên Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Trên macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Lỗi: "Cannot connect to Docker daemon"

```bash
# Đảm bảo Docker Desktop đang chạy
# Khởi động lại Docker
sudo service docker restart
```

### Lỗi: Database connection failed

```bash
# Kiểm tra logs
docker-compose logs postgres

# Xóa và tạo lại containers
docker-compose down -v
docker-compose up --build
```

### Frontend không kết nối được Backend

```bash
# Kiểm tra backend đang chạy
curl http://localhost:5000/api/health

# Nếu không hoạt động, xem logs
docker-compose logs backend
```

## 🎨 Sử Dụng Ứng Dụng

### Trang Chủ
- Xem danh sách tất cả sách
- Tìm kiếm sách bằng thanh tìm kiếm
- Xem chi tiết hoặc đặt trước

### Xem Chi Tiết Sách
- Thông tin đầy đủ về sách
- Đánh giá từ khách hàng khác
- Để lại đánh giá của bạn
- Nút "Đặt Trước"

### Đặt Trước Sách
- Nhập thông tin cá nhân
- Chọn số lượng
- Nhập địa chỉ giao
- Xác nhận đặt hàng

## 📱 Tính Năng Chính

✅ Xem danh sách sách
✅ Tìm kiếm sách
✅ Xem chi tiết sách chi tiết
✅ Đánh giá sách
✅ Đặt trước sách với thông tin khách hàng
✅ Xem trạng thái đơn hàng
✅ API quản lý đơn hàng

## 🔧 Tùy Chỉnh Cơ Bản

### Thay Đổi Port

**Mở docker-compose.yml:**
```yaml
# Backend port
ports:
  - "5001:5000"  # Thay 5001 bằng port mới

# Frontend port
# Chạy: npm start -- --port 3001
```

### Thay Đổi Database Password

**Mở docker-compose.yml:**
```yaml
environment:
  POSTGRES_PASSWORD: password_mới
```

**Cập nhật .env trong backend:**
```
DATABASE_URL=postgresql://bookadmin:password_mới@postgres:5432/bookstore
```

## 📦 Dừng Ứng Dụng

```bash
# Dừng và giữ container
docker-compose stop

# Dừng và xóa container
docker-compose down

# Dừng, xóa container và xóa volumes (tất cả dữ liệu)
docker-compose down -v
```

## 🆘 Hỗ Trợ Thêm

Nếu gặp vấn đề:
1. Xem log: `docker-compose logs`
2. Kiểm tra status: `docker-compose ps`
3. Xem README.md để có thêm thông tin
4. Liên hệ: support@bookstore.com

## 🎓 Học Thêm

- [Docker Documentation](https://docs.docker.com)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

**Chúc bạn sử dụng BookStore vui vẻ! 📚**
