import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "./../../assets/logo.png"
import './header.css';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data.products);
        } catch (error) {
            console.error('Error searching products:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleProductClick = (productId) => {
        setSearchResults([]); // Clear search results
        setSearchQuery(''); // Clear search input
        navigate(`/product/${productId}`); // Navigate to product details
    };

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <img src={Logo} alt="MWU Shop Logo" />
                    <h1>mwu shop</h1>
                </Link>
                
                <div className="search-wrapper">
                    <form className="search-form" onSubmit={handleSearch}>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                <SearchIcon />
                            </button>
                        </div>
                    </form>
                    
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map((product) => (
                                <div
                                    key={product.id}
                                    className="search-result-item"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <img src={product.thumbnail} alt={product.title} />
                                    <div className="product-info">
                                        <h3>{product.title}</h3>
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;