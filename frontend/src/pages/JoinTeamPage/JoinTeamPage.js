import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JoinTeamForm from '../../components/JoinTeamForm/JoinTeamForm';

const JoinTeamPage = ({ onBackClick }) => {
  return (
    <>
      <Container>
        <Header />
        <JoinTeamForm />
        <div style={{ height: '500px' }}></div>
        <Footer />
      </Container>
    </>
  );
};

export default JoinTeamPage;


