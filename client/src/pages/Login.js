import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      {/* <Link to="/signup">← Go to Signup</Link> */}

      <h2 style={{textAlign: "center"}}>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address:</label>
          <input
            // placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">Password:</label>
          <input
            // placeholder="*********"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="d-grid">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;