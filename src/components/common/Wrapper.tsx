import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Wrapper({ children }: Readonly<Props>) {
  return <div className="wrapper">{children}</div>;
}

export default Wrapper;
