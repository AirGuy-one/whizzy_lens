import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Card, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PhotoSessionDetail = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backend_domain = process.env.REACT_APP_BACKEND_DOMAIN;

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(`http://${backend_domain}/api/photo_sessions/${id}/`);
        setSessionData(response.data);
      } catch (error) {
        setError('Error fetching session data: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!sessionData) {
    return <Alert variant="warning">No session data available</Alert>;
  }

  return (
    <>
      <h1 className="my-4 text-center">Photo Session Details</h1>
      <h3>Session Info</h3>
      <p><strong>photographer:</strong> {sessionData.photo_session.photographer || 'N/A'}</p>
    <p>
      <strong>started at: </strong>
      {new Date(sessionData.photo_session.start_time).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
      })} {new Date(sessionData.photo_session.start_time).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </p>

    <p>
      <strong>ended at: </strong>
      {new Date(sessionData.photo_session.end_time).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
      })} {new Date(sessionData.photo_session.end_time).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </p>
      <h3 className="my-4">Photos</h3>
      {sessionData.photos.length > 0 ? (
        <Row>
          {sessionData.photos.map(photo => (
            <Col key={photo.id} md={3} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  style={{ height: '210px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Button variant="primary" onClick={() => window.open(photo.url, '_blank')}>
                    view
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No photos available for this session.</p>
      )}
    </>
  );
};

export default PhotoSessionDetail;
