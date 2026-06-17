import React, { useState } from 'react';

function Header({ onSearch, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <h1 className="logo" onClick={onNavigate} style={{ cursor: 'pointer' }}>
            📚 BookStore
          </h1>
          
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Tìm kiếm sách..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">Tìm</button>
          </form>

          <ul className="nav-links">
            <li><a href="#contact">Liên Hệ</a></li>
            <li><a href="#about">Về Chúng Tôi</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
