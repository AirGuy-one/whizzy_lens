import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Payment from '../../components/Payment/Payment';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


const PaymentPage = () => {
  return (
    <>
      <Container>
        <Header />
        <Payment />
        <Footer />
      </Container>
    </>
  );
};

export default PaymentPage;
