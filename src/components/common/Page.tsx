import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Wrapper from './Wrapper';
import Loading from './Loading';
import Header from './Header';
import Footer from './Footer';

interface Props {
  title: string;
  isNoHeader?: boolean;
  isNoLogo?: boolean;
  isNoFooter?: boolean;
  children: ReactNode;
}

function Page(props: Readonly<Props>) {
  const location = useLocation();
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = (location.pathname === '/' ? props.title : `${props.title} | JOURNEY`);
    window.scrollTo(0, 0);
    setLoading(false);
  }, [props.title]);

  return (
    <Wrapper>
      {loading || (!props.isNoHeader && <Header isNoLogo={props.isNoLogo} />)}
      { loading ? <Loading/> : <main>{ props.children }</main> }
      {loading || (!props.isNoFooter && <Footer />)}
    </Wrapper>
  );
}

export default Page;
