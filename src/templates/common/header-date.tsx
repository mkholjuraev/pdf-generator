import React from 'react';
import getHeaderDate from './get-header-date';

const HeaderDate = () => (
  <div
    style={{
      marginLeft: 'auto',
    }}
  >
    <p>
      Prepared: <span>{getHeaderDate()}</span>
    </p>
  </div>
);

export default HeaderDate;
