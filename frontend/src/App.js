import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import MySessionsPage from './pages/MySessionsPage/MySessionsPage';
import ViewMyPhotosPage from './pages/ViewMyPhotosPage/ViewMyPhotosPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BookSessionNSignUpPage from './pages/BookSessionNSignUpPage/BookSessionNSignUpPage';
import BookSessionPage from './pages/BookSessionPage/BookSessionPage';
import PrePaymentPage from './pages/PrePaymentPage/PrePaymentPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import JoinTeamPage from './pages/JoinTeamPage/JoinTeamPage';


function App() {
  useEffect(() => {
    document.title = "WHIZZY&LENS";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/photo_sessions/" element={<MySessionsPage />} />
        <Route path="/photo_sessions/:id/" element={<ViewMyPhotosPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/book_session_n_sign_up/" element={<BookSessionNSignUpPage />} />
        <Route path="/book_session/" element={<BookSessionPage />} />
        <Route path="/pre_payment/" element={<PrePaymentPage />} />
        <Route path="/photo_session/:session_pk/payment/" element={<PaymentPage />} />
        <Route path="/join_team/" element={<JoinTeamPage />} />
      </Routes>
    </Router>
  );
}


export default App;
