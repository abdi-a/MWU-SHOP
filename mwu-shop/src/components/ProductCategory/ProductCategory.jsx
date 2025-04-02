import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productcategory.css';

const ProductCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);

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
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-category">
            <h2>Select a Category</h2>
            <div className="category-list">
                {categories.map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <h3>Products in {selectedCategory}</h3>
            <div className="product-list">
                {selectedCategory && products[selectedCategory]
                    ? products[selectedCategory].map((product) => (
                          <div key={product.id} className="product-item">
                              <h4>{product.title}</h4>
                              <p>{product.description}</p>
                              <p>Price: ${product.price}</p>
                          </div>
                      ))
                    : <p>Please select a category to view products.</p>}
            </div>
        </div>
    );
};

export default ProductCategory;