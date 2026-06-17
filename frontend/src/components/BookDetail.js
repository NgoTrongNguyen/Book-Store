import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookDetail({ book, onBack, onPreOrder }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    customer_name: '',
    rating: 5,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [book.id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/books/${book.id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!newReview.customer_name || !newReview.rating) {
      setMessage('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`/api/books/${book.id}/reviews`, newReview);
      setMessage('Cảm ơn bạn đã đánh giá sách này!');
      setNewReview({
        customer_name: '',
        rating: 5,
        comment: ''
      });
      fetchReviews();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Lỗi khi gửi đánh giá. Vui lòng thử lại.');
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (original, current) => {
    if (!original) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const discount = calculateDiscount(book.original_price, book.price);

  return (
    <div>
      <div className="back-button">
        <button onClick={onBack}>← Quay Lại</button>
      </div>

      <div className="book-detail">
        <div className="detail-header">
          <div className="detail-image">
            <img src={book.image_url} alt={book.title} />
          </div>
          <div className="detail-content">
            <h1 className="detail-title">{book.title}</h1>
            <p className="detail-author">Tác giả: {book.author}</p>
            
            <div className="detail-rating">
              <div>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    {i < Math.floor(averageRating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span>({reviews.length} đánh giá)</span>
            </div>

            <div className="detail-price">
              {book.price.toLocaleString('vi-VN')} ₫
            </div>

            {book.original_price && discount > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#999', textDecoration: 'line-through', marginRight: '10px' }}>
                  {book.original_price.toLocaleString('vi-VN')} ₫
                </span>
                <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                  Giảm {discount}%
                </span>
              </div>
            )}

            {book.category && (
              <span className="detail-category">{book.category}</span>
            )}

            <p className="detail-description">
              {book.description}
            </p>

            <div className="detail-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => onPreOrder(book)}
              >
                Đặt Trước Ngay
              </button>
              <button className="btn btn-secondary">Thêm Vào Yêu Thích</button>
            </div>

            <div className="detail-stats">
              <div className="stat">
                <div className="stat-value">📚 {book.publication_year || '—'}</div>
                <div className="stat-label">Năm xuất bản</div>
              </div>
              <div className="stat">
                <div className="stat-value">📦 {book.stock || '0'}</div>
                <div className="stat-label">Còn hàng</div>
              </div>
              <div className="stat">
                <div className="stat-value">⭐ {averageRating}</div>
                <div className="stat-label">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <h2 className="reviews-title">Đánh Giá Của Độc Giả</h2>

          {message && (
            <div className={message.includes('Lỗi') ? 'error-message' : 'success-message'}>
              {message}
            </div>
          )}

          <div className="review-form">
            <h3 style={{ marginBottom: '15px' }}>Để Lại Đánh Giá Của Bạn</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Tên của bạn *</label>
                <input 
                  type="text"
                  name="customer_name"
                  value={newReview.customer_name}
                  onChange={handleReviewChange}
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div className="form-group">
                <label>Đánh giá *</label>
                <select 
                  name="rating"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                >
                  <option value="5">⭐⭐⭐⭐⭐ Rất tốt (5 sao)</option>
                  <option value="4">⭐⭐⭐⭐ Tốt (4 sao)</option>
                  <option value="3">⭐⭐⭐ Bình thường (3 sao)</option>
                  <option value="2">⭐⭐ Không tốt (2 sao)</option>
                  <option value="1">⭐ Tệ (1 sao)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Bình luận</label>
                <textarea 
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  placeholder="Chia sẻ ý kiến của bạn về sách..."
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Đang gửi...' : 'Gửi Đánh Giá'}
              </button>
            </form>
          </div>

          <div style={{ marginTop: '30px' }}>
            {reviews.length === 0 ? (
              <p style={{ color: '#999' }}>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="review-author">{review.customer_name}</span>
                    <span className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="review-text">{review.comment}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
