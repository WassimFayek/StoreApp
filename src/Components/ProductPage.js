import Header from './Header'; 
import './styles/Header.css';
import ProductList from './ProductList';
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Modal, Button  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductPage = ({onAddToCart, cartCount, cart}) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {

    const jsonPath = process.env.PUBLIC_URL + '/Products.json';
    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => { setProducts(data)
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(() => setError('Failed to load products'));
  }, []);

  const handleFilterChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!category || product.category === category) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);
  console.log("cart", cart)
  console.log("products", products)

  return (
    <>
   <Header/>
    <Container className="my-5 container">
      <h2 className="text-center mb-4 title">Product List</h2>
      {error && <div className="text-danger">{error}</div>}

      <Row className="align-items-center mb-3">
        <Col xs={12} md={3}>
          <Form.Group controlId="categoryFilter">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control as="select" value={category} onChange={handleFilterChange}>
              <option value="">All</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={10} md={8}>
          <Form.Group controlId="search">
            <Form.Label>Search Products</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col  xs={2} md={1} className="d-flex justify-content-center">  
            <div className="cart-icon position-relative cart-icon-adjustment" onClick={handleShowCart}>
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {cartCount > 0 && (
                <span className="cart-counter position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </div>
        </Col>
      </Row>

      <ProductList products={filteredProducts} onAddToCart={onAddToCart} cart={cart} className="product-list" />

      <Modal show={showCart} onHide={handleCloseCart} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            products && products.length > 0 && products.filter((product) => cart.includes(product.id))
            .map((item, index) => (
            <div key={index} className="d-flex justify-content-between mb-3">
              <div>
                <h6>{item.name}</h6>
                <p className="text-muted">${item.price}</p>
              </div>
            </div>
          ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
          {cart.length > 0 && (
            <Button variant="primary" onClick={() => alert('Proceed to checkout')}>
              Checkout
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
    </>
  );
};

export default ProductPage;
