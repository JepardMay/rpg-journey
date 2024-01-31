import React from 'react';

import LogoImg from './LogoImg';

import './loading.css';

function Loading() {
  return (
    <div className="loading" style={{ backgroundColor: '#B7DEEF'}}>
      <LogoImg></LogoImg>
    </div>
  );
}

export default Loading;