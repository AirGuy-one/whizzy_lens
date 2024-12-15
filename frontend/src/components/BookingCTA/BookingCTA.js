import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const BookingCTA = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-4'>
      <h3>
        Wanna{' '}
        <Link to={isAuthenticated ? '/book_session/' : '/book_session_n_sign_up/'}>
          <Button variant='primary' size='lg'>
            book
          </Button>
        </Link>{' '}
        a photo session? do it rn
      </h3>
    </div>
  );
};

export default BookingCTA;
