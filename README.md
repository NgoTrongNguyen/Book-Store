# Premium Book Preorder - Frontend & Backend

Ứng dụng web đầy đủ cho hệ thống pre-order sách cao cấp với các mục Overview, Reviews, và Author.

## 📁 Cấu Trúc Dự Án

```
project/
├── frontend/
│   ├── index.html      # HTML chính
│   ├── styles.css      # CSS styling
│   └── app.js          # JavaScript logic
└── backend/
    ├── server.js       # Express server
    ├── package.json    # Dependencies
    └── .env           # Environment config
```

## 🚀 Yêu Cầu

- **Node.js** v14+ (cho backend)
- **npm** hoặc **yarn**
- **Browser** hiện đại (Chrome, Firefox, Safari, Edge)

## 📦 Cài Đặt

### Backend Setup

1. **Vào thư mục backend:**
```bash
cd backend
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy server:**
```bash
npm start
```

Server sẽ chạy trên `http://localhost:3000`

**Hoặc sử dụng Nodemon (development):**
```bash
npm run dev
```

### Frontend Setup

1. **Vào thư mục frontend:**
```bash
cd frontend
```

2. **Mở file index.html:**
   - Sử dụng live server (VS Code extension)
   - Hoặc mở trực tiếp trong browser
   - **Hoặc chạy local server:**
   ```bash
   python -m http.server 5000
   # hoặc
   npx http-server
   ```

Frontend sẽ chạy trên `http://localhost:5000` (hoặc port khác tùy)

## 🌐 API Endpoints

### Base URL: `http://localhost:3000/api`

#### 1. **Health Check**
- **GET** `/health`
- Response: `{ status: 'OK' }`

#### 2. **Preorder Management**

**Submit Preorder:**
- **POST** `/preorder`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "quantity": "1",
  "address": "123 Main St",
  "city": "New York",
  "zip": "10001",
  "country": "United States",
  "requests": "Optional special requests",
  "updates": true
}
```
- Response: `{ success: true, data: { orderId, email, totalPrice, estimatedDelivery } }`

**Get All Preorders (Admin):**
- **GET** `/preorders`
- Response: `{ total: number, preorders: [...] }`

#### 3. **Reviews**

**Get All Reviews:**
- **GET** `/reviews`
- Response: `[{ id, author, title, text, rating, date }, ...]`

**Submit Review:**
- **POST** `/reviews`
- Body:
```json
{
  "author": "Jane Smith",
  "title": "Excellent Book",
  "text": "This book is amazing...",
  "rating": 5
}
```
- Response: `{ success: true, data: { review } }`

#### 4. **Author**

**Get Author Info:**
- **GET** `/author`
- Response:
```json
{
  "name": "Sarah Chen",
  "title": "Design Director",
  "bio": "...",
  "achievements": [...]
}
```

#### 5. **Book Info**

**Get Book Details:**
- **GET** `/book`
- Response:
```json
{
  "title": "The Art of Digital Design",
  "pages": 384,
  "price": 45.00,
  "averageRating": "4.8",
  "totalReviews": 5
}
```

## 🎨 Frontend Features

### Navigation
- **Overview** - Thông tin sách, form pre-order, testimonials
- **Reviews** - Các review từ độc giả
- **Author** - Thông tin tác giả Sarah Chen

### Form Validation
- ✓ Kiểm tra email format
- ✓ Yêu cầu các trường bắt buộc
- ✓ Xử lý lỗi từ server

### Responsive Design
- ✓ Desktop layout (2 cột)
- ✓ Tablet layout (tối ưu hóa)
- ✓ Mobile layout (1 cột)

### Security
- ✓ XSS Prevention (escape HTML)
- ✓ CORS enabled
- ✓ Input validation

## 🔧 Cấu Hình

### Backend .env
```
PORT=3000
NODE_ENV=development
```

### Frontend API URL
File `app.js` dòng 4:
```javascript
const API_URL = 'http://localhost:3000/api';
```

## 📊 In-Memory Database

Hiện tại, ứng dụng sử dụng in-memory storage. Khi server restart, dữ liệu sẽ bị xóa.

**Để sử dụng database thực, thay thế:**
- MongoDB
- PostgreSQL
- MySQL
- Firebase

## 🧪 Testing

### Test Form Submission
1. Điền form pre-order
2. Click "Complete Order"
3. Kiểm tra console network tab
4. Xem success message

### Test Reviews
1. Click "Reviews" tab
2. Xem các review được tải từ API
3. (Optional) Submit review mới qua API

### Test Author
1. Click "Author" tab
2. Xem thông tin tác giả từ API

## 🔒 Security Notes

1. **Validation**: Server validate tất cả dữ liệu input
2. **CORS**: Được enable để cho phép cross-origin requests
3. **Error Handling**: Tất cả errors được xử lý gracefully
4. **XSS Prevention**: HTML được escape trước hiển thị

## 📝 Development Notes

### Thêm Review Mới
```javascript
// Gửi POST request
fetch('http://localhost:3000/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    author: 'Your Name',
    title: 'Review Title',
    text: 'Review content',
    rating: 5
  })
})
```

### Thêm Preorder (Testing)
```javascript
// Sử dụng form UI hoặc call API trực tiếp
fetch('http://localhost:3000/api/preorder', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* form data */ })
})
```

## 🐛 Troubleshooting

### Error: Port 3000 already in use
```bash
# Change port in .env
PORT=3001
```

### CORS Error
- Kiểm tra backend CORS settings
- Kiểm tra Frontend API_URL config

### Reviews/Author không load
- Kiểm tra backend server đang chạy
- Kiểm tra Network tab trong DevTools
- Kiểm tra console để xem errors

## 🚢 Production Deployment

### Backend (Node.js)
1. Sử dụng PM2, Forever, hoặc service manager
2. Thay đổi `NODE_ENV=production`
3. Sử dụng database thực (MongoDB, PostgreSQL)
4. Setup environment variables an toàn
5. Enable HTTPS
6. Thêm authentication/authorization

### Frontend
1. Build process nếu sử dụng bundler
2. Deploy tới static hosting (Vercel, Netlify, S3)
3. Cấu hình API_URL cho production
4. Setup CDN cho assets

## 📚 Dependencies

### Backend
- **express**: Web framework
- **cors**: CORS middleware
- **body-parser**: Parse JSON
- **dotenv**: Environment variables
- **nodemon**: Development auto-reload

### Frontend
- Vanilla JavaScript (No dependencies)
- Modern CSS3
- Fetch API

## 📄 License

MIT License - Tự do sử dụng cho dự án cá nhân và thương mại

## 👨‍💻 Support

Nếu gặp vấn đề:
1. Kiểm tra console (Browser DevTools & Node.js terminal)
2. Xem Network tab
3. Kiểm tra .env variables
4. Ensure backend server đang chạy

---

**Happy Coding! 🎉**