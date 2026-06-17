# 📡 BookStore API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Hiện tại API không yêu cầu authentication. Trong tương lai sẽ thêm JWT token.

## Response Format

Tất cả responses sử dụng JSON format:

```json
{
  "status": "success|error",
  "data": {},
  "error": null,
  "message": "Optional message"
}
```

---

## 📚 Books Endpoints

### GET /books
Lấy danh sách tất cả sách

**Query Parameters:**
- `category` (optional): Lọc theo danh mục

**Example:**
```bash
curl http://localhost:5000/api/books
curl "http://localhost:5000/api/books?category=Tiểu%20thuyết"
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Những Người Khó Tính",
    "author": "Ngô Bá Khánh",
    "description": "Tiểu thuyết hay",
    "price": 89000,
    "original_price": 120000,
    "publication_year": 2020,
    "category": "Tiểu thuyết",
    "image_url": "https://...",
    "stock": 5,
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

---

### GET /books/:id
Lấy chi tiết một cuốn sách

**Parameters:**
- `id` (required): Mã sách

**Example:**
```bash
curl http://localhost:5000/api/books/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Những Người Khó Tính",
  "author": "Ngô Bá Khánh",
  "description": "Tiểu thuyết về cuộc sống",
  "price": 89000,
  "original_price": 120000,
  "publication_year": 2020,
  "category": "Tiểu thuyết",
  "image_url": "https://...",
  "stock": 5,
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

**Errors:**
- 404: Not Found - Sách không tồn tại

---

### GET /books/category/:category
Lấy sách theo danh mục

**Parameters:**
- `category` (required): Tên danh mục

**Example:**
```bash
curl http://localhost:5000/api/books/category/Tiểu%20thuyết
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Những Người Khó Tính",
    ...
  }
]
```

---

### GET /search
Tìm kiếm sách

**Query Parameters:**
- `q` (required): Từ khóa tìm kiếm

**Example:**
```bash
curl "http://localhost:5000/api/search?q=Python"
```

**Response:**
```json
[
  {
    "id": 4,
    "title": "Lập Trình Python",
    "author": "...",
    ...
  }
]
```

**Errors:**
- 400: Bad Request - Thiếu query parameter 'q'

---

## 💬 Reviews Endpoints

### GET /books/:id/reviews
Lấy tất cả đánh giá của một sách

**Parameters:**
- `id` (required): Mã sách

**Example:**
```bash
curl http://localhost:5000/api/books/1/reviews
```

**Response:**
```json
[
  {
    "id": 1,
    "book_id": 1,
    "customer_name": "Nguyễn Văn A",
    "rating": 5,
    "comment": "Sách rất hay",
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

---

### POST /books/:id/reviews
Tạo đánh giá mới

**Parameters:**
- `id` (required): Mã sách

**Request Body:**
```json
{
  "customer_name": "Nguyễn Văn A",
  "rating": 5,
  "comment": "Sách rất hay"
}
```

**Required Fields:**
- `customer_name`: (string, max 255)
- `rating`: (integer, 1-5)
- `comment`: (string, optional)

**Example:**
```bash
curl -X POST http://localhost:5000/api/books/1/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Nguyễn Văn A",
    "rating": 5,
    "comment": "Sách rất hay"
  }'
```

**Response:**
```json
{
  "id": 1,
  "book_id": 1,
  "customer_name": "Nguyễn Văn A",
  "rating": 5,
  "comment": "Sách rất hay",
  "created_at": "2024-01-15T10:00:00Z"
}
```

**Errors:**
- 400: Bad Request - Thiếu required fields hoặc dữ liệu không hợp lệ
- 404: Not Found - Sách không tồn tại

---

## 📦 Pre-Orders Endpoints

### POST /pre-orders
Tạo đơn đặt trước mới

**Request Body:**
```json
{
  "book_id": 1,
  "customer_name": "Nguyễn Văn A",
  "customer_email": "nguyenvana@example.com",
  "customer_phone": "0912345678",
  "quantity": 2,
  "delivery_address": "123 Đường Lê Lợi, Hà Nội",
  "notes": "Giao trước 5h chiều"
}
```

**Required Fields:**
- `book_id`: (integer)
- `customer_name`: (string, max 255)
- `customer_email`: (string, valid email)
- `customer_phone`: (string, max 20)
- `quantity`: (integer, min 1)
- `delivery_address`: (string, text)

**Optional Fields:**
- `notes`: (string, text)

**Example:**
```bash
curl -X POST http://localhost:5000/api/pre-orders \
  -H "Content-Type: application/json" \
  -d '{
    "book_id": 1,
    "customer_name": "Nguyễn Văn A",
    "customer_email": "nguyenvana@example.com",
    "customer_phone": "0912345678",
    "quantity": 2,
    "delivery_address": "123 Đường Lê Lợi, Hà Nội"
  }'
```

**Response:**
```json
{
  "message": "Pre-order created successfully",
  "data": {
    "id": 1,
    "book_id": 1,
    "customer_name": "Nguyễn Văn A",
    "customer_email": "nguyenvana@example.com",
    "customer_phone": "0912345678",
    "quantity": 2,
    "delivery_address": "123 Đường Lê Lợi, Hà Nội",
    "notes": null,
    "status": "pending",
    "total_price": 178000,
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

**Errors:**
- 400: Bad Request - Dữ liệu không hợp lệ
- 404: Not Found - Sách không tồn tại

---

### GET /pre-orders
Lấy tất cả đơn đặt trước (Admin)

**Example:**
```bash
curl http://localhost:5000/api/pre-orders
```

**Response:**
```json
[
  {
    "id": 1,
    "book_id": 1,
    "title": "Những Người Khó Tính",
    "customer_name": "Nguyễn Văn A",
    "customer_email": "nguyenvana@example.com",
    "customer_phone": "0912345678",
    "quantity": 2,
    "delivery_address": "123 Đường Lê Lợi, Hà Nội",
    "status": "pending",
    "total_price": 178000,
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

---

### GET /pre-orders/:id
Lấy chi tiết một đơn đặt trước

**Parameters:**
- `id` (required): Mã đơn

**Example:**
```bash
curl http://localhost:5000/api/pre-orders/1
```

**Response:**
```json
{
  "id": 1,
  "book_id": 1,
  "title": "Những Người Khó Tính",
  "customer_name": "Nguyễn Văn A",
  "customer_email": "nguyenvana@example.com",
  "customer_phone": "0912345678",
  "quantity": 2,
  "delivery_address": "123 Đường Lê Lợi, Hà Nội",
  "status": "pending",
  "total_price": 178000,
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

**Errors:**
- 404: Not Found - Đơn không tồn tại

---

### PUT /pre-orders/:id/status
Cập nhật trạng thái đơn đặt trước (Admin)

**Parameters:**
- `id` (required): Mã đơn

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `pending`: Đang chờ xác nhận
- `confirmed`: Đã xác nhận
- `shipped`: Đã gửi
- `delivered`: Đã giao
- `cancelled`: Đã hủy

**Example:**
```bash
curl -X PUT http://localhost:5000/api/pre-orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

**Response:**
```json
{
  "id": 1,
  "book_id": 1,
  "status": "confirmed",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- 400: Bad Request - Status không hợp lệ
- 404: Not Found - Đơn không tồn tại

---

## 📊 Admin Endpoints

### GET /admin/stats
Lấy thống kê (Admin)

**Example:**
```bash
curl http://localhost:5000/api/admin/stats
```

**Response:**
```json
{
  "books_count": 8,
  "pre_orders_count": 5,
  "total_revenue": 890000,
  "orders_by_status": [
    {
      "status": "pending",
      "count": "2"
    },
    {
      "status": "confirmed",
      "count": "1"
    },
    {
      "status": "shipped",
      "count": "2"
    }
  ]
}
```

---

## 🏥 Health Check

### GET /health
Kiểm tra server status

**Example:**
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "OK"
}
```

---

## 🔄 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request thành công |
| 201 | Created - Tài nguyên được tạo |
| 400 | Bad Request - Dữ liệu không hợp lệ |
| 404 | Not Found - Không tìm thấy tài nguyên |
| 500 | Internal Server Error - Lỗi server |

---

## 💾 Data Validation

### Email
- Phải là email hợp lệ: `example@domain.com`

### Phone
- Phải là số điện thoại hợp lệ
- Tối đa 20 ký tự

### Rating
- Phải là số từ 1 đến 5

### Quantity
- Phải là số nguyên dương (>= 1)
- Tối đa 10

---

## 🔗 Related Resources

- [Frontend Docs](./README.md)
- [Installation Guide](./INSTALLATION.md)
- [Database Schema](./init.sql)

---

## 📞 Support

Nếu gặp vấn đề với API:
1. Kiểm tra `docker-compose logs backend`
2. Đảm bảo server đang chạy: `curl http://localhost:5000/api/health`
3. Kiểm tra dữ liệu input có đúng format không

---

**Last Updated: 2024-01-15**
