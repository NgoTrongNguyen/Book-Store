import React from 'react';

function BookList({ books, onSelectBook, onPreOrder, isLoading }) {
  const calculateDiscount = (original, current) => {
    if (!original) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div> Đang tải sách...
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="book-list">
        <h2 className="section-title">Không tìm thấy sách</h2>
      </div>
    );
  }

  return (
    <div className="book-list">
      <h2 className="section-title">Danh Sách Sách Hay</h2>
      <div className="books-grid">
        {books.map((book) => {
          const discount = calculateDiscount(book.original_price, book.price);
          return (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.image_url} alt={book.title} />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">Tác giả: {book.author}</p>
                {book.category && (
                  <span className="book-category">{book.category}</span>
                )}
                <div className="book-price">
                  <span className="price-current">
                    {book.price.toLocaleString('vi-VN')} ₫
                  </span>
                  {book.original_price && (
                    <>
                      <span className="price-original">
                        {book.original_price.toLocaleString('vi-VN')} ₫
                      </span>
                      {discount > 0 && (
                        <span className="discount-badge">-{discount}%</span>
                      )}
                    </>
                  )}
                </div>
                <div className="book-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => onSelectBook(book)}
                  >
                    Chi Tiết
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => onPreOrder(book)}
                  >
                    Đặt Trước
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookList;
