# 📚 BookStore - Website Giới Thiệu Sách Và Đặt Trước

Một ứng dụng web hoàn chỉnh để giới thiệu sách và cho phép khách hàng đặt trước với cơ sở dữ liệu Docker.

## ✨ Tính Năng

- **Danh Sách Sách**: Hiển thị đầy đủ thông tin sách (tiêu đề, tác giả, giá, mô tả)
- **Tìm Kiếm Sách**: Tìm kiếm sách theo tiêu đề, tác giả, hoặc mô tả
- **Chi Tiết Sách**: Xem chi tiết đầy đủ của từng cuốn sách
- **Đánh Giá & Bình Luận**: Khách hàng có thể để lại đánh giá sách
- **Đặt Trước Sách**: Form đặt trước với validation đầy đủ
- **Quản Lý Đơn Hàng**: API để quản lý trạng thái đơn hàng
- **Thống Kê**: Dashboard thống kê cho admin
- **Responsive Design**: Giao diện đáp ứng trên mọi thiết bị

## 🏗️ Kiến Trúc Ứng Dụng

```
bookstore-app/
├── docker-compose.yml          # Docker Compose configuration
├── init.sql                     # Database initialization script
├── backend/                     # Express API server
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js               # Main server file
│   └── .env.example
├── frontend/                    # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── Header.js
│   │       ├── BookList.js
│   │       ├── BookDetail.js
│   │       ├── PreOrderForm.js
│   │       └── Footer.js
│   └── package.json
└── README.md
```

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Node.js & Express.js**: Web framework
- **PostgreSQL**: Database
- **Axios**: HTTP client
- **Cors**: Cross-origin requests
- **Validator**: Data validation

### Frontend
- **React 18**: UI library
- **Axios**: API calls
- **CSS3**: Styling

### DevOps
- **Docker & Docker Compose**: Containerization
- **PostgreSQL**: Database

## 📋 Yêu Cầu Hệ Thống

- Docker & Docker Compose
- Node.js 18+ (nếu chạy locally)
- npm hoặc yarn

## 🚀 Hướng Dẫn Cài Đặt Và Chạy

### 1. Clone Repository

```bash
git clone <repository-url>
cd bookstore-app
```

### 2. Chạy Với Docker Compose

```bash
# Build và khởi động các services
docker-compose up --build

# Hoặc chạy ở background
docker-compose up -d --build
```

Ứng dụng sẽ khởi động trên:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

### 3. Chạy Locally (Không Dùng Docker)

#### 3.1 Khởi động Database

```bash
# Cần cài PostgreSQL sẵn
# Tạo database
createdb bookstore

# Chạy init script
psql -U postgres -d bookstore -f init.sql
```

#### 3.2 Khởi động Backend

```bash
cd backend
npm install
npm run dev
```

Backend sẽ chạy trên http://localhost:5000

#### 3.3 Khởi động Frontend

```bash
cd frontend
npm install
npm start
```

Frontend sẽ chạy trên http://localhost:3000

## 📊 Cấu Trúc Database

### Bảng `books`
```sql
- id: Mã sách
- title: Tên sách
- author: Tác giả
- description: Mô tả
- price: Giá hiện tại
- original_price: Giá gốc
- publication_year: Năm xuất bản
- category: Danh mục
- image_url: URL ảnh
- stock: Số lượng tồn kho
```

### Bảng `pre_orders`
```sql
- id: Mã đơn đặt trước
- book_id: Mã sách
- customer_name: Tên khách hàng
- customer_email: Email khách hàng
- customer_phone: Điện thoại
- quantity: Số lượng
- delivery_address: Địa chỉ giao
- notes: Ghi chú
- status: Trạng thái (pending, confirmed, shipped, delivered, cancelled)
- total_price: Tổng tiền
```

### Bảng `reviews`
```sql
- id: Mã đánh giá
- book_id: Mã sách
- customer_name: Tên khách hàng
- rating: Điểm đánh giá (1-5)
- comment: Bình luận
```

## 🔌 API Endpoints

### Books
- `GET /api/books` - Lấy tất cả sách
- `GET /api/books/:id` - Lấy chi tiết sách
- `GET /api/books/category/:category` - Lấy sách theo danh mục
- `GET /api/search?q=query` - Tìm kiếm sách

### Reviews
- `GET /api/books/:id/reviews` - Lấy đánh giá của sách
- `POST /api/books/:id/reviews` - Tạo đánh giá mới

### Pre-Orders
- `POST /api/pre-orders` - Tạo đơn đặt trước
- `GET /api/pre-orders` - Lấy tất cả đơn đặt trước
- `GET /api/pre-orders/:id` - Lấy chi tiết đơn
- `PUT /api/pre-orders/:id/status` - Cập nhật trạng thái đơn

### Admin
- `GET /api/admin/stats` - Lấy thống kê

### Health Check
- `GET /api/health` - Kiểm tra server status

## 📝 Ví Dụ Request

### Tạo Đơn Đặt Trước

```bash
curl -X POST http://localhost:5000/api/pre-orders \
  -H "Content-Type: application/json" \
  -d '{
    "book_id": 1,
    "customer_name": "Nguyễn Văn A",
    "customer_email": "nguyenvana@example.com",
    "customer_phone": "0912345678",
    "quantity": 2,
    "delivery_address": "123 Đường Lê Lợi, Hà Nội",
    "notes": "Giao trước 5h chiều"
  }'
```

### Tìm Kiếm Sách

```bash
curl "http://localhost:5000/api/search?q=Python"
```

### Cập Nhật Trạng Thái Đơn Hàng

```bash
curl -X PUT http://localhost:5000/api/pre-orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

## 🎨 Giao Diện

### Màu Sắc Chính
- Chính: #667eea (Tím)
- Phụ: #764ba2 (Tím đậm)
- Thành công: #d4edda (Xanh nhạt)
- Lỗi: #f8d7da (Đỏ nhạt)

### Font
- Chữ: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

## 🔒 Bảo Mật

- Validation dữ liệu trên cả client và server
- Email validation
- SQL Injection prevention (Parameterized queries)
- CORS enabled

## 📦 Quản Lý Dữ Liệu

### Backup Database

```bash
docker-compose exec postgres pg_dump -U bookadmin bookstore > backup.sql
```

### Restore Database

```bash
docker-compose exec -T postgres psql -U bookadmin bookstore < backup.sql
```

### Xóa Toàn Bộ Data

```bash
docker-compose down -v
```

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Thay đổi port trong docker-compose.yml
# Hoặc kill process chiếm port
lsof -ti:5000 | xargs kill -9
```

### Database connection error

```bash
# Kiểm tra Docker container
docker-compose ps

# Xem logs
docker-compose logs postgres
docker-compose logs backend
```

### Frontend không kết nối được API

- Kiểm tra proxy trong `frontend/package.json`
- Đảm bảo backend đang chạy
- Kiểm tra CORS settings trong `backend/server.js`

## 📚 Sample Data

Database sẽ được initialized với 8 cuốn sách mẫu bao gồm:
- Những Người Khó Tính
- Chuyến Đi Vòng Quanh Thế Giới
- Dạy Con Giỏi
- Thói Quen Nguyên Tử
- Đắc Nhân Tâm
- Cuộc Sống Pi
- Tư Duy Nhanh Và Chậm
- 1984

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại

## 👥 Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra troubleshooting section
2. Xem logs
3. Liên hệ qua email support

## 🚀 Cải Tiến Trong Tương Lai

- [ ] Authentication & Authorization
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Wishlist functionality
- [ ] User reviews sorting/filtering
- [ ] Book recommendations
- [ ] Inventory management
- [ ] SMS notifications
- [ ] Mobile app

---

**Tạo bởi**: Development Team
**Phiên bản**: 1.0.0
**Cập nhật lần cuối**: 2024
