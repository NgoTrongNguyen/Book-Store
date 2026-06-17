import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import PreOrderForm from './components/PreOrderForm';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const response = await axios.get('/api/search', { params: { q: query } });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setCurrentPage('detail');
  };

  const handlePreOrder = (book) => {
    setSelectedBook(book);
    setCurrentPage('preorder');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setSelectedBook(null);
    setSearchResults([]);
  };

  return (
    <div className="App">
      <Header 
        onSearch={handleSearch}
        onNavigate={handleGoHome}
      />
      
      <main className="main-content">
        {currentPage === 'home' && (
          <BookList 
            books={searchResults.length > 0 ? searchResults : books}
            onSelectBook={handleSelectBook}
            onPreOrder={handlePreOrder}
            isLoading={loading}
          />
        )}
        
        {currentPage === 'detail' && selectedBook && (
          <BookDetail 
            book={selectedBook}
            onBack={handleGoHome}
            onPreOrder={handlePreOrder}
          />
        )}
        
        {currentPage === 'preorder' && selectedBook && (
          <PreOrderForm 
            book={selectedBook}
            onBack={handleGoHome}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
