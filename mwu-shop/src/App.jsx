import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import ProductCategory from './components/ProductCategory/ProductCategory';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
       {/* <LoginPage/> */}
       <ProductCategory/>
       <ProductList/>
   <Routes>  
       <Route path = "/" element = {<ProductList/>}/>
       <Route path = "/category" element = {<ProductCategory/>}/>
       <Route path = "/login" element = {<LoginPage/>}/>
      </Routes>
       <Footer />
      </div>
    </Router>
  );
}

export default App;