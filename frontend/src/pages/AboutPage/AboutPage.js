import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AboutUs = () => {
  return (
    <Container>
      <Header />
      <Row className="text-center mb-4">
        <Col>
          <h1>About Us</h1>
          <p>Welcome to WhizzyLens!</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Who We Are</Card.Title>
              <Card.Text>
                WhizzyLens is a dedicated team of photographers and technology experts committed to delivering exceptional photographic services. We understand the importance of these precious moments and strive to offer a seamless and enjoyable experience for both parents and photographers.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Our Services</Card.Title>
              <Card.Text>
                <ul>
                  <li><strong>User Authentication:</strong> Our secure login system ensures that both parents and photographers have access to their respective accounts with peace of mind.</li>
                  <li><strong>Photo Upload and Management:</strong> Our platform allows photographers to effortlessly upload and manage their portfolios, ensuring that every shot is available for viewing and downloading.</li>
                  <li><strong>Photo Viewing and Downloading:</strong> Parents can easily view and download their children’s photos, either individually or in bulk, making it simple to share and cherish these memories.</li>
                  <li><strong>Search and Filtering:</strong> Our advanced search and filtering options help parents find specific photos based on various criteria, making the experience efficient and personalized.</li>
                  <li><strong>Security and Privacy:</strong> We prioritize the security and privacy of your photos. Our robust measures ensure that images are securely stored and accessible only to authorized users.</li>
                  <li><strong>Notifications:</strong> Stay updated with our notification system that alerts parents when new photos are uploaded, ensuring you never miss a moment.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Why Choose WhizzyLens?</Card.Title>
              <Card.Text>
                At WhizzyLens, we blend artistic vision with cutting-edge technology to create an unparalleled photo experience. Our team’s dedication to quality and service means that you can trust us to handle your precious memories with care.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Get in Touch</Card.Title>
              <Card.Text>
                We love to hear from our community! Whether you’re a parent looking to view your child’s latest photos or a photographer interested in joining our platform, feel free to reach out to us. For more information about our services or to discuss your specific needs, contact us at [contact email] or follow us on [social media links].
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default AboutUs;
