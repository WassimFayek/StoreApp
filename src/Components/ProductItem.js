import React, { useState } from 'react';
import './styles/ProductItem.css';
import { Card, Col } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="star-icon full-star" />
      ))}
      {halfStar === 1 && <FaStarHalfAlt className="star-icon half-star" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="star-icon empty-star" />
      ))}
    </>
  );
};

const ProductItem = ({ product, onAddToCart, cart }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const maxDescriptionLength = 100;
  const shortDescription = product.description.slice(0, maxDescriptionLength);
  const isInCart = cart && cart.includes(product.id)

  if (!product) return null;
  return (
    <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-4">
        <Card className="h-100 shadow-sm product-card">
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title className="d-flex align-items-center justify-content-between">
            <span>{product.name}</span> 
            <div className="rating">{renderStars(product.rating)}</div>
            </Card.Title>
            <Card.Text className="text-muted">{product.category}</Card.Text>
            <Card.Text>${product.price}</Card.Text>
            <Card.Text>
            {showFullDescription ? product.description : `${shortDescription}...`}
            {product.description.length > maxDescriptionLength && (
              <span
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={toggleDescription}
              >
                {showFullDescription ? ' See less' : ' See more'}
              </span>
            )}
            </Card.Text>
            <Card.Text>
             <button  disabled={isInCart}  className="btn btn-primary w-100" onClick={() => onAddToCart(product)}>
             {isInCart ? "In Cart" : "Add to Cart"}
            </button>
             </Card.Text>
          </Card.Body>
        </Card>
      </Col>
  );
};

export default ProductItem;
