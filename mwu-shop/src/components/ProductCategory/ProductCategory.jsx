import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './productcategory.css';

const ProductCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products?limit=100&skip=0');
                const allProducts = response.data.products;

                // Categorize products by their category field
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
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (loading) {
        return (
            <div className="product-category">
                <div className="loading">Loading categories...</div>
            </div>
        );
    }

    return (
        <div className="product-category">
            {/* <h2>Browse Categories</h2> */}
            <div className="category-list">
                <button 
                    className={selectedCategory === '' ? 'active' : ''} 
                    onClick={() => setSelectedCategory('')}
                >
                    All Categories
                </button>
                {categories.map((category) => (
                    <button 
                        key={category} 
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? 'active' : ''}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <h3>
                {selectedCategory 
                    ? `Products in ${selectedCategory}` 
                    : 'All Products'}
            </h3>

            <div className="product-list">
                {selectedCategory
                    ? products[selectedCategory].map((product) => (
                        <div 
                            key={product.id} 
                            className="product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="product-image">
                                <img src={product.thumbnail} alt={product.title} />
                                <div className="discount-badge">
                                    -{Math.round(product.discountPercentage)}%
                                </div>
                            </div>
                            <h4>{product.title}</h4>
                            <p className="product-description">{product.description}</p>
                            <div className="product-meta">
                                <p className="product-price">${product.price}</p>
                                <div className="product-rating">
                                    <span>⭐ {product.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))
                    : Object.values(products).flat().map((product) => (
                        <div 
                            key={product.id} 
                            className="product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="product-image">
                                <img src={product.thumbnail} alt={product.title} />
                                <div className="discount-badge">
                                    -{Math.round(product.discountPercentage)}%
                                </div>
                            </div>
                            <h4>{product.title}</h4>
                            <p className="product-description">{product.description}</p>
                            <div className="product-meta">
                                <p className="product-price">${product.price}</p>
                                <div className="product-rating">
                                    <span>⭐ {product.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductCategory;