import React, {
  // useState
} from 'react';
import { NavLink } from 'react-router-dom';

import {
  // ErrorType
} from '../../model';

import Page from '../Page';

import './sign.css';

interface Props {
  title: string;
  heading: string;
  footer: {
    text: string,
    link: {
      text: string,
      url: string,
    }
  };
}

function Sign({ title, heading, footer }: Props) {
  // const [error, setError] = useState<ErrorType>({
  //   email: null,
  //   password: null,
  // });

  return (
    <Page title={ title } isNoHeader={ true }>
      <div className="sign">
        <div className="sign__wrapper">
          <h2 className="sign__title">{ heading }</h2>
          <form action="#">
            <div className="sign__input input-wrapper">
              <label htmlFor="email">Email</label>
            <input
              // className={error.email ? 'is-invalid' : ''}
              type="email"
              required
              placeholder="Enter your email"
              id="email"
              // value={signState.email}
            />
            {/* {error.email && <span className="sign__error error">{error.email}</span>} */}
          </div>
            <div className="sign__input input-wrapper">
              <label htmlFor="password">Password</label>
            <input
              // className={error.password ? 'is-invalid' : ''}
              type="password"
              required
              placeholder="Enter your password"
              id="password"
              // value={signState.password}
            />
            {/* {error.password && <span className="sign__error error">{error.password}</span>} */}
            </div>
            <button
            className="sign__btn btn"
            type="submit"
          >
            <span>{ title }</span>
            </button>
            <div className="sign__footer">
              <p>{ title === 'Login' && <a href="#" className="link">Forgot password?</a>}</p>
              <p>{ footer.text } <NavLink to={footer.link.url} className="link">{footer.link.text}!</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default Sign;
