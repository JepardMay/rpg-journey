import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Wrapper(props: Props) {
  return <main className="wrapper">{props.children}</main>;
}

export default Wrapper;
