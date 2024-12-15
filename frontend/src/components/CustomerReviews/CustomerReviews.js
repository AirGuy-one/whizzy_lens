import React from 'react';
import { Card, Button } from 'react-bootstrap';

const reviews = [
  {
    name: 'John Doe',
    rating: '☆☆☆☆',
    review: 'Amazing service! Highly recommend.',
  },
  {
    name: 'Jane Smith',
    rating: '☆☆☆',
    review: 'Beautiful photos and very professional.',
  },
];

const CustomerReviews = () => {
  return (
    <div className="mt-4" style={{ backgroundColor: '#d9dcdd' }}>
      <h2>Customer Reviews</h2>
      {reviews.map((review, index) => (
        <Card key={index} className="mb-3" style={{ backgroundColor: '#d9dcdd' }}>
          <Card.Body>
            <Card.Title>{review.name}</Card.Title>
            <Card.Text>{review.rating}</Card.Text>
            <Card.Text>{review.review}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Button variant="warning" style={{ backgroundColor: '#d9dcdd' }}>Submit Your Review</Button>
    </div>
  );
};

export default CustomerReviews;
