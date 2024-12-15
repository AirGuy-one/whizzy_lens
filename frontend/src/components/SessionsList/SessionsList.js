import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [authenticated, setAuthenticated] = useState(true); // Track authentication status
  const backend_domain = process.env.REACT_APP_BACKEND_DOMAIN;

  useEffect(() => {
    axios.get(`http://${backend_domain}/api/photo_sessions/`, { withCredentials: true })
      .then(response => {
        setUserRole(response.data.user_role);
        setClasses(response.data.session_data);
        setAuthenticated(true);
      })
      .catch(error => {
        console.error('There was an error fetching the classes!', error);
        if (error.response && error.response.status === 403) {
          // Handle unauthenticated access
          setAuthenticated(false);
        }
      });
  }, []);

  const handleDemoClick = () => {
    alert("that's just an example of a button");
  };

  return (
    <Container>
      <h1 className="my-4 text-center">My Sessions</h1>
      {!authenticated && (
        <div className="text-center">
          <h2>Please log in to view your sessions</h2>
        </div>
      )}
      {authenticated && (
        <>
          {userRole === 'admin' && (
            <div>
              {classes.map((managerData, index) => (
                <div key={index}>
                  {Object.keys(managerData).map(managerUsername => (
                    <div key={managerUsername}>
                      <p style={{ fontSize: '1.5rem' }}>MANAGER: <b>{managerUsername}</b></p>
                      {managerData[managerUsername].map((photographerData, index) => (
                        <div key={index}>
                          {Object.keys(photographerData).map(photographerUsername => (
                            <div key={photographerUsername}>
                              <p style={{ fontSize: '1.5rem' }}>Photographer: <b>{photographerUsername}</b></p>
                              <Row>
                                {photographerData[photographerUsername].map(session => (
                                  <Col key={session.pk} md={3} className="mb-4">
                                    <Card>
                                      <Card.Body className="d-flex flex-column justify-content-between">
                                        <Card.Title>Session {session.pk}</Card.Title>
                                        <Link to={`/photo_sessions/${session.pk}/`} className="mt-auto">
                                          <Button variant="primary">Browse</Button>
                                        </Link>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                ))}
                              </Row>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {userRole === 'manager' && (
            <div>
              {classes.map((photographer) => (
                <div key={photographer.ph_username}>
                  <p style={{ fontSize: '1.5rem' }}>Photographer: <b>{photographer.ph_username}</b></p>
                  <Row>
                    {photographer.photo_sessions.map((session) => (
                      <Col key={session.pk} md={3} className="mb-4">
                        <Card>
                          <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Title>Session {session.pk}</Card.Title>
                            <Link to={`/photo_sessions/${session.pk}/`} className="mt-auto">
                              <Button variant="primary">Browse</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </div>
          )}
          {userRole === 'photographer' && (
            <Row>
              {classes.map((classItem) => (
                <Col key={classItem.pk} md={3} className="mb-4">
                  <Card>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title>Session {classItem.pk}</Card.Title>
                      <Link to={`/photo_sessions/${classItem.pk}/`} className="mt-auto">
                        <Button variant="primary">Browse</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {userRole === 'customer' && (
            <div>
              <Row>
                {classes.map((classItem) => (
                  <Col key={classItem.pk} md={3} className="mb-4">
                    <Card>
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title>Session {classItem.pk}</Card.Title>
                        {classItem.is_paid ? (
                          <Link to={`/photo_sessions/${classItem.pk}/`} className="mt-auto">
                            <Button variant="primary">Browse</Button>
                          </Link>
                        ) : (
                          <Link to={`/photo_session/${classItem.pk}/payment/`} className="mt-auto">
                            <Button variant="warning">Pay</Button>
                          </Link>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          <div style={{ height: '370px' }}></div>
          {userRole === 'customer' && (
            <div>
              <h4><strong>Button Colors Guide:</strong></h4>
              <ul>
                <li><h5>Yellow <Button variant="warning" onClick={handleDemoClick}>button</Button>: Indicates an unpaid photo session</h5></li>
                <li><h5>Blue <Button variant="primary" onClick={handleDemoClick}>button</Button>: Indicates a paid photo session</h5></li>
              </ul>
            </div>
          )}
        </>
      )}

    </Container>
  );
};

export default ClassesPage;
