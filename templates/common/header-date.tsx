import React from 'react';
import getHeaderDate from './get-header-date';

const HeaderDate = () => (
  <div>
    Prepared: <span>{getHeaderDate()}</span>
  </div>
);

export default HeaderDate;
