import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useAuthUser from '../../hooks/useAuthUser';

const UserInfo = () => {
  const user = useAuthUser();

  return (
    <Container>
      <Row>
        <Col>
          {user ? (
            <div>
              <p style={{ fontSize: '2rem' }}>You are logged in as <b>{user.email}</b></p>
              <p>username: {user.username}</p>
              <p>email: {user.email}</p>
            </div>
          ) : (
            <p style={{ fontSize: '2rem' }}>Log in to see account info</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
