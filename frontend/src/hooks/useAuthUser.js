import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://0.0.0.0:8000/auth/user_detail/', { withCredentials: true })
      .then(response => {
        const { username, email } = response.data;
        if (username) {
          setUser({ username, email });
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return user;
};

export default useAuthUser;
