import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

const Login = () => {
  const navigate = useNavigate();  // Use navigate instead of history
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both email and password are provided
    if (!email || !pass) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/api/auth/login', {
        email,
        pass,
      });

      // On successful login, store the token in localStorage (or any other method like Redux or Context)
      localStorage.setItem('token', response.data.token);

      // Optionally store user data if needed
      localStorage.setItem('userID', response.data.userID);
      localStorage.setItem('fname', response.data.fname);
      // console.log(response.data)

      // Dispatch a storage event to force listening components (like Navbar) to update
      window.dispatchEvent(new Event("storage"));

      // Redirect to a protected page (like dashboard) after login
      navigate('/');  // Use navigate() instead of history.push()
    } catch (err) {
      if (err.response) {
        // Handle errors from the backend
        setError(err.response.data.message || 'An error occurred during login.');
        console.log(err);
      } else {
        // Handle network errors or other issues
        setError('Network error. Please try again later.');
      }
    }
  };


  return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Login</h2>
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.email}
                required
            />
            <input
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className={styles.input}
                required
            />
            <button type="submit" className={styles.button}>
                Login
            </button>
        </form>
    </div>
  );
};

export default Login;













  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check if both email and password are provided
  //   if (!email || !pass) {
  //     setError('Please enter both email and password.');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:3005/api/auth/login', {
  //       email,
  //       pass,
  //     });

  //     // On successful login, store the token in localStorage (or any other method like Redux or Context)
  //     localStorage.setItem('token', response.data.token);

  //     // Optionally store user data if needed
  //     localStorage.setItem('userID', response.data.userID);
  //     localStorage.setItem('fname', response.data.fname);

  //     // Redirect to a protected page (like dashboard) after login
  //     navigate('/');  // Use navigate() instead of history.push()

  //   } catch (err) {
  //     if (err.response) {
  //       // Handle errors from the backend
  //       setError(err.response.data.message || 'An error occurred during login.');
  //       console.log(err)
  //     } else {
  //       // Handle network errors or other issues
  //       setError('Network error. Please try again later.');
  //     }
  //   }
  // };