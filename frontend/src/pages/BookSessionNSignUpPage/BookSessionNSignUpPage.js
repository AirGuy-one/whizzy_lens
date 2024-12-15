import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BookSessionNSignUp from '../../components/BookSessionNSignUp/BookSessionNSignUp';

const BookSessionNSignUpPage = () => {
  return (
    <>
      <Container>
        <Header />
        <BookSessionNSignUp />
        <Footer />
      </Container>
    </>
  );
};

export default BookSessionNSignUpPage;
