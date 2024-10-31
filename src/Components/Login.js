import './styles/Login.css';
import Header from './Header';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'test@example.com' && password === 'password123') {
      navigate('/products');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="d-flex align-items-center justify-content-center login-container">
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={8} md={6} lg={5} xl={4}>
            <Card className="p-4 shadow-lg" style={{ maxWidth: '100%', width: '100%' }}>
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>
                      <FaEnvelope /> Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>
                      <FaLock /> Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {error && <p className="text-danger">{error}</p>}

                  <Button variant="primary" type="submit" className="w-100 login-button">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
