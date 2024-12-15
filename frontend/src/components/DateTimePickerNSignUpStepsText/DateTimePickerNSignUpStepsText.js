import React from 'react';

const DateTimePickerNSignUpStepsText = ({ showDateTimePicker }) => {
  return (
    <>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        HERE U CAN BOOK A SESSION
      </p>
      <p
        style={{
          fontSize: '1.5rem',
          color: showDateTimePicker ? 'black' : '#D9DDDC',
        }}
      >
        1. pick datetime & address to book a session
      </p>
      <p
        style={{
          fontSize: '1.5rem',
          color: showDateTimePicker ? '#D9DDDC' : 'black',
        }}
      >
        2. sign up w/ email to view ur pics later
      </p>
    </>
  );
};

export default DateTimePickerNSignUpStepsText;
