import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JoinTeamCTA = () => {
  return (
    <div className="mt-4">
      <h3>
        Wanna <Link to="/join_team/">
                <Button variant="success" size="lg">join
                </Button>
              </Link> our team? dnt hesitate
      </h3>
    </div>
  );
};

export default JoinTeamCTA;
