import React from 'react';
import getHeaderDate from './get-header-date';
import RedHatLogo from './images/redhat-logo';

const CommonHeader = () => {
  return (
    <div
      style={{
        fontFamily: 'Red Hat Text',
        fontStyle: 'italic',
        fontSize: 9,
        color: '#ccc',
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
      }}
    >
      <div style={{ width: 150 }}>
        <RedHatLogo />
      </div>
      <div
        style={{
          marginLeft: 'atuo',
        }}
      >
        <p>
          Prepared: <span>{getHeaderDate()}</span>
        </p>
      </div>
    </div>
  );
};

export default CommonHeader;
