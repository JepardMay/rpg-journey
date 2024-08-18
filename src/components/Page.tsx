import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { StateType } from '../model';

import Wrapper from './Wrapper';
import Loading from './loading/Loading';
import Header from './header/Header';
import Footer from './footer/Footer';

interface Props {
  title: string;
  isNoHeader?: boolean;
  isNoLogo?: boolean;
  isNoFooter?: boolean;
  children: ReactNode;
  user?: StateType;
  setUser?: (user: StateType) => void;
}

function Page(props: Props) {
  const location = useLocation();
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = (location.pathname === '/' ? props.title : `${props.title} | JOURNEY`);
    window.scrollTo(0, 0);
    setLoading(false);
  }, [props.title]);

  return (
    <Wrapper>
      {loading || (!props.isNoHeader && <Header user={props.user} setUser={props.setUser} isNoLogo={props.isNoLogo} />)}
      { loading ? <Loading></Loading> : <main>{ props.children }</main> }
      {loading || (!props.isNoFooter && <Footer />)}
    </Wrapper>
  );
}

export default Page;
