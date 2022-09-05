import React from 'react';

const FooterContainer: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      width: '100%',
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 16,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

export default FooterContainer;
