import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

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
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div className="error">Product not found</div>;
    }

    return (
        <div className="product-details">
            <div className="product-images">
                <div className="main-image">
                    <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="image-gallery">
                    {product.images.map((image, index) => (
                        <img 
                            key={index}
                            src={image}
                            alt={`${product.title} - ${index + 1}`}
                            className="gallery-image"
                        />
                    ))}
                </div>
            </div>
            
            <div className="product-info-detailed">
                <h1>{product.title}</h1>
                <div className="product-meta">
                    <span className="brand">Brand: {product.brand}</span>
                    <span className="category">Category: {product.category}</span>
                    <span className="rating">Rating: {product.rating}⭐</span>
                </div>
                
                <div className="price-section">
                    <div className="price">${product.price}</div>
                    <div className="discount">
                        {product.discountPercentage}% OFF
                    </div>
                </div>
                
                <p className="description">{product.description}</p>
                
                <div className="stock-info">
                    <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {product.stock > 0 && (
                        <span className="stock-count">
                            {product.stock} units available
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails; 