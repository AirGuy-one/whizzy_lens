import React, { useState } from 'react';
import { Container, Form, InputGroup, Button, Col, Row, ToggleButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DateTimePickerSingleStepText from '../../components/DateTimePickerSingleStepText/DateTimePickerSingleStepText';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookSession.css';
import axios from 'axios';

const BookSessionNSignUp = () => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(true);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  const currentHour = today.getHours();

  const getDisplayMonths = () => {
    let months = [];
    for (let i = 0; i < 3; i++) {
      const nextMonthDate = new Date(currentYear, currentMonth + i);

      if (nextMonthDate.getMonth() === 0 && currentMonth + i > 11) {
        months.push(new Date(currentYear + 1, nextMonthDate.getMonth()));
      } else {
        months.push(nextMonthDate);
      }
    }
    return months;
  };

  const handleNextClick = async () => {
    console.log('it feels so empty without me');
    console.log(step + ' step');

    if (step === 1 && selectedMonth !== null) {
      if (selectedMonth === 0 || selectedMonth === 1) { // January or February
        setSelectedYear(currentYear + 1);
      } else {
        setSelectedYear(currentYear);
      }
      setStep(2);
    } else if (step === 2 && selectedDay !== null) {
      setStep(3);
    } else if (step === 3 && selectedTimes.length >= 2) {
      setStep(4);
    } else if (step === 4 && address.trim().length > 0) {
      try {
        const response = await axios.post(
          'http://0.0.0.0:8000/api/book_session/',
          {
            selectedYear,
            selectedMonth,
            selectedDay,
            selectedTimes,
            address,
          },
          {
            withCredentials: true,
          }
        );
        alert('Success! Photo session was created.');
        navigate('/pre_payment/');
      } catch (error) {
        setErrorMessage('Error submitting session booking. Please try again.');
        console.error('Error:', error);
      }
    } else {
      if (selectedTimes.length < 2) {
        setErrorMessage('You need to pick an interval, not just a single time.');
      }
    }
  };

  const handleBackClick = () => {
    console.log('it feels so empty without me');
    console.log(step + ' step');

    if (step === 2) {
      setStep(1);
      setSelectedMonth(null);
    } else if (step === 3) {
      setStep(2);
      setSelectedDay(null);
    } else if (step === 4) {
      setStep(3);
      setSelectedTimes([]);
    } else if (step === 5) {
      setStep(4);
      setShowDateTimePicker(true);
    }
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const isWeekday = (date) => {
    const dayOfWeek = new Date(currentYear, selectedMonth, date).getDay();
    // 0 - Sunday, 6 - Saturday
    return dayOfWeek !== 0 && dayOfWeek !== 6;
  };

  const handleToggle = (value) => {
    const newSelection = selectedTimes.includes(value)
      ? selectedTimes.filter((time) => time !== value)
      : [...selectedTimes, value];

    if (checkContiguous(newSelection)) {
      setSelectedTimes(newSelection);
      setErrorMessage('');
    } else {
      setErrorMessage('Please pick only contiguous times.');
    }
  };

  const checkContiguous = (selection) => {
    if (selection.length <= 1) return true;

    const sorted = selection.sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] !== sorted[i - 1] + 1) return false;
    }
    return true;
  };

  const getOrdinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const firstRowHours = hours.slice(0, 4);
  const secondRowHours = hours.slice(4, 8);
  const thirdRowHours = hours.slice(8);

  const isAddressValid = address.trim().length > 0;

  return (
    <>
      <DateTimePickerSingleStepText />
      {showDateTimePicker && (
        <>
          {/* Step 1: Select Month */}
          <div className={`step-container ${step === 1 ? 'active-step' : 'inactive-step'}`}>
            <div>
              <h2>select a month</h2>
              <Row>
                {getDisplayMonths().map((date) => (
                  <Col key={date.getMonth()} xs="auto" className="mb-2">
                    <Button
                      variant={selectedMonth === date.getMonth() ? 'primary' : 'outline-secondary'}
                      onClick={() => handleMonthSelect(date.getMonth())}
                    >
                      {date.toLocaleString('default', { month: 'long' })}
                    </Button>
                  </Col>
                ))}
              </Row>
              <Button
                variant="info"
                className="mb-2"
                onClick={handleNextClick}
                disabled={selectedMonth === null}
              >
                next
              </Button>
            </div>
          </div>

          {/* Step 2: Select Day */}
          <div className={`step-container ${step === 2 ? 'active-step' : 'inactive-step'}`}>
            {step >= 2 && (
              <div>
                <h2>select a day</h2>
                <Row>
                  {[...Array(new Date(currentYear, selectedMonth + 1, 0).getDate()).keys()]
                    .filter((d) => isWeekday(d + 1)) // Keep only weekdays
                    .map((d) => {
                    const isBeforeToday = currentMonth === selectedMonth && d + 1 < currentDay;
                    return (
                      <Col key={d} xs="auto" className="mb-2">
                        <Button
                          variant={selectedDay === d + 1 ? 'primary' : 'outline-secondary'}
                          onClick={() => handleDaySelect(d + 1)}
                          disabled={isBeforeToday}
                        >
                          {getOrdinal(d + 1)}
                        </Button>
                      </Col>
                    );
                  })}
                </Row>
                <Button
                  variant="warning"
                  className="mb-2 me-2"
                  onClick={handleBackClick}
                >
                  back
                </Button>
                <Button
                  variant="info"
                  className="mb-2"
                  onClick={handleNextClick}
                  disabled={selectedDay === null}
                >
                  next
                </Button>
              </div>
            )}
          </div>

          {/* Step 3: Select Time Slot */}
          <div className={`step-container ${step === 3 ? 'active-step' : 'inactive-step'}`}>
            {step >= 3 && (
              <div>
                <h2>
                  select a time slot on {getOrdinal(selectedDay)} of {new Date(currentYear, selectedMonth).toLocaleString('default', { month: 'long' })}
                </h2>
                <Row className="mb-2">
                  {firstRowHours.map((hour) => (
                    <Col xs="auto" key={hour} className="mb-2">
                      <ToggleButton
                        id={`toggle-check-${hour}`}
                        type="checkbox"
                        variant="outline-secondary"
                        checked={selectedTimes.includes(hour)}
                        value={hour}
                        onChange={() => handleToggle(hour)}
                        disabled={selectedMonth === currentMonth && selectedDay === currentDay && hour < currentHour}
                      >
                        {hour}:00
                      </ToggleButton>
                    </Col>
                  ))}
                </Row>
                <Row className="mb-2">
                  {secondRowHours.map((hour) => (
                    <Col xs="auto" key={hour} className="mb-2">
                      <ToggleButton
                        id={`toggle-check-${hour}`}
                        type="checkbox"
                        variant="outline-secondary"
                        checked={selectedTimes.includes(hour)}
                        value={hour}
                        onChange={() => handleToggle(hour)}
                        disabled={selectedMonth === currentMonth && selectedDay === currentDay && hour < currentHour}
                      >
                        {hour}:00
                      </ToggleButton>
                    </Col>
                  ))}
                </Row>
                <Row className="mb-2">
                  {thirdRowHours.map((hour) => (
                    <Col xs="auto" key={hour} className="mb-2">
                      <ToggleButton
                        id={`toggle-check-${hour}`}
                        type="checkbox"
                        variant="outline-secondary"
                        checked={selectedTimes.includes(hour)}
                        value={hour}
                        onChange={() => handleToggle(hour)}
                        disabled={selectedMonth === currentMonth && selectedDay === currentDay && hour < currentHour}
                      >
                        {hour}:00
                      </ToggleButton>
                    </Col>
                  ))}
                </Row>
                <Button
                  variant="warning"
                  className="mb-2 me-2"
                  onClick={handleBackClick}
                >
                  back
                </Button>
                <Button
                  variant="info"
                  className="mb-2"
                  onClick={handleNextClick}
                  disabled={selectedTimes.length < 2}
                >
                  next
                </Button>
              </div>
            )}
          </div>

          {/* Step 4: Address */}
          <div className={`step-container ${step === 4 ? 'active-step' : 'inactive-step'}`}>
            {step === 4 && (
              <div>
                <h2>where should photographer meet u?</h2>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    isInvalid={!isAddressValid && address.length > 0}
                  />
                </InputGroup>
                <Button
                  variant="warning"
                  className="mb-2 me-2"
                  onClick={handleBackClick}
                >
                  back
                </Button>
                <Button
                  variant="info"
                  className="mb-2"
                  onClick={handleNextClick}
                  disabled={!isAddressValid}
                >
                  submit
                </Button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </div>
            )}
          </div>
        </>
      )}
      <div style={{ height: '450px' }}></div>
    </>
  );
};

export default BookSessionNSignUp;
