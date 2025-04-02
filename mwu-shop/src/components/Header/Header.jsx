import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./../../assets/logo.png"
import './header.css';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Searching for:', searchQuery);
    };

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <img src={Logo} alt="MWU Shop Logo" />
                    <h1>MWU SHOP</h1>
                </Link>
                
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
            </div>
        </header>
    );
};

export default Header;