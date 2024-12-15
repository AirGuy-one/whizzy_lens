import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, InputGroup, Button, Col, Row, ToggleButton } from 'react-bootstrap';
import axios from 'axios';

const SignUpForm = ({ onBackClick, selectedYear, selectedMonth, selectedDay, selectedTimes, address }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const backend_domain = process.env.REACT_APP_BACKEND_DOMAIN;

  console.log(selectedYear);
  console.log('selectedYear');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://${backend_domain}/api/book_session_n_sign_up/`, {
        email: email,
        selectedYear: selectedYear,
        selectedMonth: selectedMonth,
        selectedDay: selectedDay,
        selectedTimes: selectedTimes,
        address: address,
      });

      const { username, password, message } = response.data;
      alert(`Success! Your username is ${username} and password is ${password}. ${message}`);

      navigate('/pre_payment/');
    } catch (error) {
      setErrorMessage('Error submitting form. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup.Text>&lt;-- email</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-center">
          <span style={{ fontSize: '1.2rem', color: '#d9dcdd' }}>need to send ur username & pass</span>
        </Col>
      </Row>
      <div className="d-flex">
        <Button variant="warning" className="me-2" onClick={onBackClick}>back</Button>
        <Button variant="info" onClick={handleSubmit}>
          submit
        </Button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SignUpForm;
