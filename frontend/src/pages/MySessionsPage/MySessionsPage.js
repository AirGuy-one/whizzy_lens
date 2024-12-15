import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SessionsList from '../../components/SessionsList/SessionsList';


const MySessionsPage = () => {
  return (
    <div>
      <Container>
        <Header />
        <SessionsList />
        <Footer />
      </Container>
    </div>
  );
};

export default MySessionsPage;
