import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { RootState } from '../../store';

import { usePageEffect } from '../../hooks/usePageEffect';

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

function Page({ title, isNoHeader, isNoLogo, isNoFooter, children }: Readonly<Props>) {
  const location = useLocation();
  
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  usePageEffect(title, location.pathname);

  if (isLoading) return <Loading />;

  const header = !isNoHeader && <Header isNoLogo={isNoLogo} />;
  const footer = !isNoFooter && <Footer />;

  return (
    <Wrapper>
      {header}
      <main>{children}</main>
      {footer}
    </Wrapper>
  );
}

export default Page;
