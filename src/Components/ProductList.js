import './styles/ProductItem.css';
import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onAddToCart, cart}) => {
  return (
    <div className="row">
      {products.map((product, index) => (
        <ProductItem key={index} product={product} onAddToCart={onAddToCart} cart={cart}  />
      ))}
    </div>
  );
};

export default ProductList;
