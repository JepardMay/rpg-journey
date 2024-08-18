import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import apiService from '../../api.service';

import {
  SignType,
  ErrorType
} from '../../model';

import Page from '../Page';

import './sign.css';

interface Props {
  title: string;
  heading: string;
}

function Sign({ title, heading }: Props) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const [signState, setSignState] = useState<SignType>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<ErrorType>({
    email: null,
    password: null,
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    
    setSignState({
      ...signState,
      [name]: value
    });
    setError({
      ...error,
      [name]: null
    });
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    try {
      if (isLogin) {
      const response = await apiService.login(signState);
      if (response.success) {
        // Handle successful login, save the user's authentication token
      } else {
        setError({
          email: response.emailError || null,
          password: response.passwordError || null,
        });
      }
    } else {
      const response = await apiService.signup(signState);
      if (response.success) {
        // Handle successful sign-up, save the user's authentication token
      } else {
        setError({
          email: response.emailError || null,
          password: response.passwordError || null,
        });
      }
    }
    } catch (err) {
      console.log(err);
      setError({
        email: 'Failed to sign up/login. Please try again.',
        password: 'Failed to sign up/login. Please try again.',
      });
    }
  };

  return (
    <Page title={ title } isNoHeader={ true }>
      <div className="sign">
        <div className="sign__wrapper">
          <h2 className="sign__title">{ heading }</h2>
          <form method="post" onSubmit={handleSubmit}>
            <div className="sign__input input-wrapper">
              <label htmlFor="email">Email</label>
            <input
              className={error.email ? 'is-invalid' : ''}
              type="email"
              required
              placeholder="Enter your email"
              id="email"
              name="email"
              defaultValue={ signState.email }
              onChange={handleInputChange}
            />
            {error.email && <span className="sign__error error">{error.email}</span>}
          </div>
            <div className="sign__input input-wrapper">
              <label htmlFor="password">Password</label>
            <input
              className={error.password ? 'is-invalid' : ''}
              type="password"
              required
              placeholder="Enter your password"
              id="password"
              name="password"
              defaultValue={signState.password}
              onChange={handleInputChange}
            />
            {error.password && <span className="sign__error error">{error.password}</span>}
            </div>
            <button
            className="sign__btn btn"
            type="submit"
          >
            <span>{ title }</span>
            </button>
            <div className="sign__footer">
              <p>{ isLogin && <a href="#" className="link">Forgot password?</a>}</p>
              <p>
                { isLogin ? 'Need an account? ' : 'Already have an account? ' }
                <NavLink to={ isLogin ? '/signup' : '/login' } className="link">
                  {isLogin ? 'Sign up' : 'Sign In'}!
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default Sign;
