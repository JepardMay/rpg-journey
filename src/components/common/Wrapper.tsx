import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Wrapper(props: Readonly<Props>) {
  return <div className="wrapper">{props.children}</div>;
}

export default Wrapper;
