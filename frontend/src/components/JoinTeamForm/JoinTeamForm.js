import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JoinTeamForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <>
        <h3>Successfully sent 2 ur email all info about interview</h3>
        <p>go <Link to="/">
                <Button variant="warning" className="me-2">
                  back
                </Button>
              </Link>
                2 the main page
        </p>
        <div style={{ height: '200px' }}></div>
      </>
    );
  }

  return (
    <>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        HERE U CAN JOIN OUR TEAM
      </p>
      <p style={{ fontSize: '1.5rem' }}>
        to join our team, enter ur name & email so we can send u an interview date, time, & call link
      </p>
      <Row className="mb-3">
        <Col xs={12} md={3}>
          <InputGroup className="mb-3">
            <Form.Control placeholder="email" />
            <InputGroup.Text>&lt;-- email</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} md={3}>
          <InputGroup className="mb-3">
            <Form.Control placeholder="name" />
            <InputGroup.Text>&lt;-- name</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <div className="d-flex">
        <Link to="/">
          <Button variant="warning" className="me-2">
            back
          </Button>
        </Link>
        <Button variant="info" onClick={handleSubmit}>
          submit
        </Button>
      </div>
    </>
  );
};

export default JoinTeamForm;
