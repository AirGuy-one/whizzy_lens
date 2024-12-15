import React from 'react';
import Header from '../../components/Header/Header';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import CompanyBranding from '../../components/CompanyBranding/CompanyBranding';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import UserInfo from '../../components/UserInfo/UserInfo';
import Footer from '../../components/Footer/Footer';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <>
      <Container>
        <Header />
        <UserInfo />
        <Footer />
      </Container>
    </>
  );
};

export default HomePage;
