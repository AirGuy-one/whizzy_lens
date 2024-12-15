import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


const PrePaymentPage = () => {
  return (
    <div>
      <Container>
        <Header />
        <h3>
          THIS DNT WORK FOR THE MOMENT PLS WAIT UNTIL WE FIX IT
          LGTM, fella<br />
          use the username and pass sent to ur email to log in next time<br />
          & now u can <Link to="/payment/">
              <Button variant="success" size="lg">
                move on
              </Button>
            </Link> to the payment
        </h3>
        <p style={{ fontSize: '1.5rem' }}>
          or u can c ur booked sessions in "my sessions" as "unpaid" til' u pay
        </p>
        <h3>
          <Link to="/">
            <Button size="lg">
            go
            </Button>
          </Link> 2 the main page
        </h3>
        <Footer />
      </Container>
    </div>
  );
};

export default PrePaymentPage;
