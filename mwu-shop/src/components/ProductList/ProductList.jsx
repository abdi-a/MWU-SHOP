import React, { useEffect, useState } from 'react';
import './productlist.css';
import CloseIcon from '@mui/icons-material/Close';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=100&skip=0');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = async (productId) => {
        setLoadingProduct(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const detailedProduct = await response.json();
            setSelectedProduct(detailedProduct);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoadingProduct(false);
        }
    };

    const closeModal = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setSelectedProduct(null);
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    return (
        <div>
            <div className="product-list">
                {products.map(product => (
                    <div 
                        key={product.id} 
                        className="product-item"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p className="product-brief">{product.description.substring(0, 100)}...</p>
                        <p className="product-price">Price: ${product.price}</p>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="product-modal-overlay" onClick={closeModal}>
                    <div className="product-modal" onClick={handleModalClick}>
                        <button className="close-button" onClick={closeModal}>
                            <CloseIcon />
                        </button>
                        {loadingProduct ? (
                            <div className="loading">Loading product details...</div>
                        ) : (
                            <div className="product-modal-content">
                                <div className="product-image">
                                    <img 
                                        src={selectedProduct.thumbnail} 
                                        alt={selectedProduct.title} 
                                        className="main-image"
                                    />
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
    );
};

export default ProductList;