import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Logo from "./logo.png"

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('');
        setSearchResults([]);
        setSelectedProduct(null);
        navigate('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (product) => {
    setLoadingProduct(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${product.id}`);
      const detailedProduct = await response.json();
      setSelectedProduct(detailedProduct);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoadingProduct(false);
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSearchQuery('');
    setSearchResults([]);
    setSelectedProduct(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src={Logo} alt="JO SHOP Logo" />
            <h1>mwu shop</h1>
          </Link>
        </div>
        
        <div className="search-bar" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <div className="search-input-container">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          {/* Search Results */}
          {searchQuery && (
            <div className="search-results">
              {loading ? (
                <div className="loading">Searching...</div>
              ) : (
                searchResults.length > 0 ? (
                  <div className="results-list">
                    {searchResults.map((product) => (
                      <div 
                        key={product.id} 
                        className="result-item"
                        onClick={() => handleProductClick(product)}
                      >
                        <img src={product.thumbnail} alt={product.title} />
                        <div className="result-info">
                          <h4>{product.title}</h4>
                          <p>${product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  searchQuery && <div className="no-results">No products found</div>
                )
              )}
            </div>
          )}

          {selectedProduct && (
            <div className="product-modal-overlay" onClick={closeModal}>
              <div className="product-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>
                  <CloseIcon />
                </button>
                {loadingProduct ? (
                  <div className="loading">Loading product details...</div>
                ) : (
                  <div className="product-modal-content">
                    <div className="product-images">
                      <img 
                        src={selectedProduct.thumbnail} 
                        alt={selectedProduct.title} 
                        className="main-image"
                      />
                      <div className="product-gallery">
                        {selectedProduct.images.map((image, index) => (
                          <img 
                            key={index} 
                            src={image} 
                            alt={`${selectedProduct.title} ${index + 1}`}
                            className="gallery-image"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="product-details">
                      <h2>{selectedProduct.title}</h2>
                      <p className="product-brand">Brand: {selectedProduct.brand}</p>
                      <p className="product-category">Category: {selectedProduct.category}</p>
                      <p className="product-description">{selectedProduct.description}</p>
                      <div className="product-meta">
                        <p className="product-price">Price: ${selectedProduct.price}</p>
                        <p className="product-rating">Rating: {selectedProduct.rating}⭐</p>
                        <p className="product-stock">Stock: {selectedProduct.stock} units</p>
                        <p className="product-discount">Discount: {selectedProduct.discountPercentage}% off</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <nav className="nav-links">
          {user ? (
            <div className="user-info">
              <span>{user.displayName || user.email}</span>
            </div>
          ) : (
            <Link to="/login" className="nav-link">SignUp</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;