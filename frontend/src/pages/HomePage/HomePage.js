import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import CompanyBranding from '../../components/CompanyBranding/CompanyBranding';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import Footer from '../../components/Footer/Footer';
import BookingCTA from '../../components/BookingCTA/BookingCTA';
import JoinTeamCTA from '../../components/JoinTeamCTA/JoinTeamCTA';


const HomePage = () => {
  return (
    <div>
      <Container>
        <Header />
        <ImageCarousel />
        <CompanyBranding />
        <BookingCTA />
        <CustomerReviews />
        <JoinTeamCTA />
        <Footer />
      </Container>
    </div>
  );
};

export default HomePage;
