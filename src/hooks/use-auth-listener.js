import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export default function useAuthListener() {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const checkAuthStatus = () => {
      try {
        const token = Cookies.get('token');

        if (token) {
          const payload = jwt_decode(token);
          console.log(token)
          setUser({ isAuthenticated: true,token:token,email:payload.email });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuthStatus();
   
    return () => {
     
    };
  }, []);

  return { user };
}