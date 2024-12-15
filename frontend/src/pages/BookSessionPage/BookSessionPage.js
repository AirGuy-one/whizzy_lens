import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BookSession from '../../components/BookSession/BookSession';

const BookSessionPage = () => {
  return (
    <>
      <Container>
        <Header />
        <BookSession />
        <Footer />
      </Container>
    </>
  );
};

export default BookSessionPage;
