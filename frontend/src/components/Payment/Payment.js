import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const navigate = useNavigate();
  const { session_pk } = useParams();

  console.log(session_pk);

  const handlePayClick = async () => {
    try {
      const response = await axios.post(
        `http://0.0.0.0:8000/api/session/${session_pk}/pay/`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('COOL BRUH SESSION WAS PAID SUCCESSFULLY');
        navigate('/');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error paying for session:', error);
      alert('Error paying for session');
    }
  };

  return (
    <>
      <h1>Payment</h1>
      <Button onClick={handlePayClick}>Pay Here</Button>
    </>
  );
};

export default Payment;
