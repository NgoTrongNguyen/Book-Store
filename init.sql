-- Create tables
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    publication_year INTEGER,
    category VARCHAR(100),
    image_url VARCHAR(500),
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pre_orders (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    delivery_address TEXT NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_pre_orders_book_id ON pre_orders(book_id);
CREATE INDEX idx_pre_orders_status ON pre_orders(status);
CREATE INDEX idx_pre_orders_email ON pre_orders(customer_email);
CREATE INDEX idx_reviews_book_id ON reviews(book_id);

-- Insert sample books
INSERT INTO books (title, author, description, price, original_price, publication_year, category, image_url, stock) VALUES
('Những Người Khó Tính', 'Ngô Bá Khánh', 'Tiểu thuyết về cuộc sống và những mối quan hệ phức tạp', 89000, 120000, 2020, 'Tiểu thuyết', 'https://via.placeholder.com/300x400?text=Khó+Tính', 5),
('Chuyến Đi Vòng Quanh Thế Giới', 'Jules Verne', 'Một cuộc phiêu lưu kỳ thú xuyên suốt 80 ngày', 95000, 130000, 2019, 'Phiêu lưu', 'https://via.placeholder.com/300x400?text=Vòng+Quanh+Thế+Giới', 8),
('Dạy Con Giỏi Là Trải Nghiệm Không Phải Điểm Số', 'Amy Chua', 'Phương pháp dạy con hiện đại và hiệu quả', 85000, 110000, 2021, 'Nuôi dạy con', 'https://via.placeholder.com/300x400?text=Dạy+Con', 12),
('Thói Quen Nguyên Tử', 'James Clear', 'Cách xây dựng thói quen tốt từ những thay đổi nhỏ', 105000, 145000, 2018, 'Phát triển cá nhân', 'https://via.placeholder.com/300x400?text=Thói+Quen', 15),
('Đắc Nhân Tâm', 'Dale Carnegie', 'Nghệ thuật giao tiếp và xây dựng mối quan hệ', 75000, 100000, 2020, 'Kỹ năng sống', 'https://via.placeholder.com/300x400?text=Đắc+Nhân+Tâm', 20),
('Cuộc Sống Pi', 'Yann Martel', 'Câu chuyện sinh tồn kì diệu trên biển', 98000, 135000, 2019, 'Tiểu thuyết', 'https://via.placeholder.com/300x400?text=Cuộc+Sống+Pi', 7),
('Tư Duy Nhanh Và Chậm', 'Daniel Kahneman', 'Khám phá cách chúng ta suy nghĩ và đưa ra quyết định', 110000, 150000, 2017, 'Tâm lý học', 'https://via.placeholder.com/300x400?text=Tư+Duy', 10),
('1984', 'George Orwell', 'Tác phẩm kinh điển về chế độ toàn trị', 82000, 115000, 2018, 'Tiểu thuyết', 'https://via.placeholder.com/300x400?text=1984', 6);

-- Insert sample reviews
INSERT INTO reviews (book_id, customer_name, rating, comment) VALUES
(1, 'Nguyễn Văn A', 5, 'Tuyệt vời! Cuốn sách này thực sự hay và sâu sắc.'),
(1, 'Trần Thị B', 4, 'Rất hay, nhưng hơi dài.'),
(3, 'Lê Văn C', 5, 'Rất hữu ích cho việc dạy con.'),
(4, 'Phạm Thị D', 5, 'Thay đổi cách suy nghĩ của tôi về thói quen.'),
(5, 'Hoàng Văn E', 4, 'Kinh điển, nhưng có phần cũ.');
