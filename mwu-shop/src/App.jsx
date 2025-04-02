import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import ProductCategory from './components/ProductCategory/ProductCategory';
import LoginPage from './components/LoginPage/Login';
import SignupPage from './components/LoginPage/SignUpPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <div className="App">
        <Routes>
     
          <Route
            path="/"
            element={
              <>
                <Header user={user} />
                <ProductCategory />
                <ProductList />
                <Footer />
              </>
            }
          />
          <Route
            path="/category"
            element={
              <>
                <Header user={user} />
                <ProductCategory />
                <Footer />
              </>
            }
          />

          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;