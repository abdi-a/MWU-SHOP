import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        console.log('Newsletter subscription for:', email);
        setEmail('');
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About MWU SHOP</h3>
                    <p>Your one-stop destination for all your shopping needs. We provide quality products at competitive prices with excellent customer service.</p>
                    <div className="social-links">
                        <a href="#" className="social-link">
                            <FacebookIcon />
                        </a>
                        <a href="#" className="social-link">
                            <TwitterIcon />
                        </a>
                        <a href="#" className="social-link">
                            <InstagramIcon />
                        </a>
                        <a href="#" className="social-link">
                            <LinkedInIcon />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                      
                      
                        <li><Link to="/categories">Categories</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <ul className="contact-info">
                        <li>
                            <LocationOnIcon />
                            <span>dorm Street, block 13 </span>
                        </li>
                        <li>
                            <PhoneIcon />
                            <span>+2538890645</span>
                        </li>
                        <li>
                            <EmailIcon />
                            <span>contact@mwushop.com</span>
                        </li>
                    </ul>
                </div>

        
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} MWU SHOP. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
