import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './Components/Login';
import ProductPage from './Components/ProductPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    if (!cart.includes(product.id)) {
      setCart((prevCart) => [...prevCart, product.id]);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/StoreApp" element={<Login />} />
        <Route path="/products" element={<ProductPage onAddToCart={handleAddToCart} cartCount={cart.length} cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
