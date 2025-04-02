import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="product-details-container">
                <div className="loading">Loading product details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-details-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-container">
                <div className="error">Product not found</div>
            </div>
        );
    }

    return (
        <div className="product-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                <ArrowBackIcon /> Back
            </button>

            <div className="product-details-content">
                <div className="product-images">
                    <div className="main-image">
                        <img 
                            src={product.images[selectedImage]} 
                            alt={product.title} 
                        />
                    </div>
                    <div className="image-thumbnails">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.title} - ${index + 1}`}
                                className={selectedImage === index ? 'active' : ''}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info">
                    <h1>{product.title}</h1>
                    
                    <div className="product-meta">
                        <span className="brand">Brand: {product.brand}</span>
                        <span className="category">Category: {product.category}</span>
                        <div className="rating">
                            <StarIcon /> {product.rating.toFixed(1)}
                        </div>
                    </div>

                    <div className="price-section">
                        <div className="price">${product.price}</div>
                        {product.discountPercentage > 0 && (
                            <div className="discount">
                                {Math.round(product.discountPercentage)}% OFF
                            </div>
                        )}
                    </div>

                    <p className="description">{product.description}</p>

                    <div className="product-details-grid">
                        <div className="detail-item">
                            <LocalShippingIcon />
                            <div>
                                <h4>Shipping</h4>
                                <p>{product.shippingInformation || 'Standard shipping'}</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <InventoryIcon />
                            <div>
                                <h4>Stock Status</h4>
                                <p className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                                    {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
                                </p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <AssignmentReturnIcon />
                            <div>
                                <h4>Return Policy</h4>
                                <p>{product.returnPolicy || '30 days return'}</p>
                            </div>
                        </div>
                    </div>

                    {product.reviews && product.reviews.length > 0 && (
                        <div className="reviews-section">
                            <h3>Customer Reviews</h3>
                            <div className="reviews-list">
                                {product.reviews.map((review, index) => (
                                    <div key={index} className="review-item">
                                        <div className="review-header">
                                            <span className="reviewer-name">{review.reviewerName}</span>
                                            <div className="review-rating">
                                                <StarIcon /> {review.rating}
                                            </div>
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                        <span className="review-date">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails; 