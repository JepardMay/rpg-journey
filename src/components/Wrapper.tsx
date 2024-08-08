import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Wrapper(props: Props) {
  return <div className="wrapper">{props.children}</div>;
}

export default Wrapper;
