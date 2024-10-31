import './ProductItem.css';
import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products}) => {
  console.log("products",products)
  return (
    <div className="row">
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
