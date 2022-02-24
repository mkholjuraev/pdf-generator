import React from 'react';

const HeaderContainer: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      width: '100%',
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'end',
    }}
  >
    {children}
  </div>
);

export default HeaderContainer;
