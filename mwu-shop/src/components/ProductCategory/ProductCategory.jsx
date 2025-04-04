import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productcategory.css';
import CloseIcon from '@mui/icons-material/Close';

const ProductCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products?limit=100&skip=0');
                const allProducts = response.data.products;

                const categorizedProducts = allProducts.reduce((acc, product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = [];
                    }
                    acc[product.category].push(product);
                    return acc;
                }, {});

                setCategories(Object.keys(categorizedProducts));
                setProducts(categorizedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = async (product) => {
        setLoadingProduct(true);
        try {
            const response = await axios.get(`https://dummyjson.com/products/${product.id}`);
            setSelectedProduct(response.data);
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

    return (
        <div className="product-category">
            <h2>Choose</h2>
            <div className="category-list">
                {categories.map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>
            {selectedCategory && <h3 className="selected-category">Products in {selectedCategory}</h3>}
            <div className="product-list">
                {selectedCategory && products[selectedCategory] &&
                    products[selectedCategory].map((product) => (
                        <div
                            key={product.id}
                            className="product-item"
                            onClick={() => handleProductClick(product)}
                        >
                            <img src={product.thumbnail} alt={product.title} />
                            <h4>{product.title}</h4>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))
                }
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

export default ProductCategory;