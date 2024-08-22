import React, { useState, useContext } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import apiService from '../../api.service';

import {
  StateType,
  SignType,
  ErrorType
} from '../../model';

import Page from '../Page';

import './sign.css';

interface Props {
  user: StateType;
  setUser: (user: StateType) => void;
  title: string;
  heading: string;
}

function Sign({ user, setUser, title, heading }: Props) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Sign component must be used within an AuthProvider');
  }

  const { isLoggedIn, login } = authContext;

  const [signState, setSignState] = useState<SignType>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<ErrorType>({
    email: null,
    password: null,
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

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
    setSubmitting(true);

    try {
      if (isLogin) {
        const response = await apiService.login(signState);
        if (!response.error) {
          login(response.accessToken, response.refreshToken);
          // Temporary username assignment
          const username = signState.email.split('@')[0];
          setUser({ ...user, name: username });
          //
          navigate('/profile', { replace: true });
        } else {
          console.log(response);
          setError({
            email: response.error || 'Failed to login. Please try again.',
            password: response.passwordError || 'Failed to login. Please try again.',
          });
        }
      } else {
        const response = await apiService.signup(signState);
        if (!response.error) {
          login(response.accessToken, response.refreshToken);
          // Temporary username assignment
          const username = signState.email.split('@')[0];
          setUser({ ...user, name: username });
          //
          navigate('/profile', { replace: true });
        } else {
          console.log(response);
          setError({
            email: response.error || 'Failed to sign-up. Please try again.',
            password: null,
          });
        }
      }
    } catch (err) {
      console.log('Error during API call:', err);
      setError({
        email: `Failed to ${isLogin ? 'login' : 'sign up'}. Please try again.`,
        password: `Failed to ${ isLogin ? 'login' : 'sign up'}. Please try again.`,
      });
    }

    setSubmitting(false);
  };
  
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <Page title={ title } isNoHeader={ true } isNoFooter={ true }>
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
              onChange={ handleInputChange }
              disabled={submitting}
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
              onChange={ handleInputChange }
              disabled={submitting}
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
                <NavLink
                  to={ isLogin ? '/signup' : '/login' }
                  className="link"
                  onClick={ () => setError({
                    email: null,
                    password: null,
                  }) }
                >
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
