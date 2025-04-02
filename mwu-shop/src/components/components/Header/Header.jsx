import React from 'react';
// import { Link } from 'react-router-dom';
import './header.css';
import Logo from "./logo.png"
const Header = () => {
    return (
        <header className="header">
            <div className="logo">
              {/* <img src={Logo} alt="" /> */}
                
                <h1>MWU SHOP</h1>
                
            </div>
            <nav className="nav">
              
            </nav>
        </header>
    );
};

export default Header;