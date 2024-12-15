import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PhotosGrid from '../../components/PhotosGrid/PhotosGrid';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ViewMyPhotosPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <Header />
        <PhotosGrid />
        <div style={{ height: '500px' }}></div>
        <Footer />
      </Container>
    </div>
  );
};

export default ViewMyPhotosPage;
