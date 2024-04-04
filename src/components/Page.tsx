import React, { ReactNode, useState, useEffect } from 'react';

import { StateType } from '../model';

import Wrapper from './Wrapper';
import Loading from './loading/Loading';
import Header from './header/Header';

interface Props {
  title: string;
  children: ReactNode;
  user?: StateType;
  setUser?: (user: StateType) => void;
}

function Page(props: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = `${props.title} | Journey`;
    window.scrollTo(0, 0);
    setLoading(false);
  }, [props.title]);

  return (
    <Wrapper>
      {loading || <Header user={props.user} setUser={props.setUser} />}
      {loading ? <Loading></Loading> : <main>{props.children}</main>}
    </Wrapper>
  );
}

export default Page;
