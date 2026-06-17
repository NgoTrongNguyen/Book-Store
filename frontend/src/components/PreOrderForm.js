import React, { useState } from 'react';
import axios from 'axios';

function PreOrderForm({ book, onBack }) {
  const [formData, setFormData] = useState({
    book_id: book.id,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    quantity: 1,
    delivery_address: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.customer_name || !formData.customer_email || !formData.customer_phone || !formData.delivery_address) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customer_email)) {
      setError('Email không hợp lệ');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/pre-orders', formData);
      setSuccess(true);
      setOrderData(response.data.data);
      setFormData({
        book_id: book.id,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        quantity: 1,
        delivery_address: '',
        notes: ''
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Lỗi khi tạo đơn đặt trước. Vui lòng thử lại.';
      setError(errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = book.price * formData.quantity;

  if (success && orderData) {
    return (
      <div>
        <div className="back-button">
          <button onClick={onBack}>← Quay Lại</button>
        </div>

        <div className="preorder-form">
          <div className="success-message" style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px' }}>✓ Đặt Trước Thành Công!</h3>
            <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
          </div>

          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Thông Tin Đơn Hàng</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div>
                <strong>Mã Đơn Hàng:</strong>
                <p style={{ color: '#667eea', fontSize: '18px' }}>{orderData.id}</p>
              </div>
              <div>
                <strong>Trạng Thái:</strong>
                <p style={{ fontSize: '16px', color: '#ffc107' }}>Đang Chờ Xác Nhận</p>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
              <h4>Chi Tiết Đặt Hàng:</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span><strong>Sách:</strong> {book.title}</span>
                <span>x{formData.quantity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span><strong>Giá Đơn Vị:</strong></span>
                <span>{book.price.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ddd' }}>
                <span><strong>Tổng Cộng:</strong></span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#667eea' }}>
                  {totalPrice.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
              <h4>Thông Tin Khách Hàng:</h4>
              <div style={{ marginTop: '10px' }}>
                <p><strong>Tên:</strong> {formData.customer_name}</p>
                <p><strong>Email:</strong> {formData.customer_email}</p>
                <p><strong>Điện Thoại:</strong> {formData.customer_phone}</p>
                <p><strong>Địa Chỉ Giao:</strong> {formData.delivery_address}</p>
                {formData.notes && <p><strong>Ghi Chú:</strong> {formData.notes}</p>}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <strong>📧 Hướng Dẫn Tiếp Theo:</strong>
            <ul style={{ marginTop: '10px', marginLeft: '20px', color: '#333' }}>
              <li>Chúng tôi sẽ gửi email xác nhận đến {formData.customer_email}</li>
              <li>Bạn sẽ nhận được thông báo khi sách sẵn sàng gửi</li>
              <li>Chúng tôi sẽ liên hệ qua điện thoại {formData.customer_phone} nếu cần thông tin thêm</li>
            </ul>
          </div>

          <button className="btn btn-primary" onClick={onBack} style={{ width: '100%' }}>
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="back-button">
        <button onClick={onBack}>← Quay Lại</button>
      </div>

      <div className="preorder-form">
        <h2 className="preorder-title">Đặt Trước Sách</h2>
        <p className="preorder-subtitle">{book.title}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sách: <span style={{ color: '#667eea', fontWeight: 'bold' }}>{book.title}</span></label>
            <p style={{ color: '#666', marginTop: '5px' }}>Tác giả: {book.author}</p>
          </div>

          <div className="form-group">
            <label>Giá: <span style={{ color: '#667eea', fontWeight: 'bold' }}>
              {book.price.toLocaleString('vi-VN')} ₫
            </span></label>
          </div>

          <div className="form-group">
            <label>Số Lượng *</label>
            <input 
              type="number" 
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>

          <div className="form-group">
            <label style={{ fontSize: '14px', color: '#999' }}>
              Tổng Tiền: <span style={{ color: '#667eea', fontWeight: 'bold', fontSize: '16px' }}>
                {totalPrice.toLocaleString('vi-VN')} ₫
              </span>
            </label>
          </div>

          <hr style={{ margin: '20px 0' }} />

          <h3 style={{ marginBottom: '15px' }}>Thông Tin Khách Hàng</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Tên Đầy Đủ *</label>
              <input 
                type="text" 
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số Điện Thoại *</label>
              <input 
                type="tel" 
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleChange}
                placeholder="0912345678"
              />
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label>Địa Chỉ Giao Hàng *</label>
              <textarea 
                name="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ giao hàng đầy đủ"
                rows="3"
              />
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label>Ghi Chú (Tùy Chọn)</label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Thêm bất kỳ ghi chú nào cho chúng tôi..."
                rows="3"
              />
            </div>
          </div>

          <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <strong>Thông Tin Đơn Hàng:</strong>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <span>Sách: {formData.quantity}x {book.title}</span>
              <span>{(book.price * formData.quantity).toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px 20px', fontSize: '16px' }}
            disabled={loading}
          >
            {loading ? 'Đang Xử Lý...' : `Xác Nhận Đặt Trước (${totalPrice.toLocaleString('vi-VN')} ₫)`}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#999', marginTop: '20px', fontSize: '12px' }}>
          Bằng cách nhấp nút trên, bạn đồng ý với điều khoản và chính sách của chúng tôi.
        </p>
      </div>
    </div>
  );
}

export default PreOrderForm;
