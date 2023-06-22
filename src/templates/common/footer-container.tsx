import React from 'react';

const FooterContainer: React.FC<{ fontSize: string }> = ({
  fontSize,
  children,
}) => (
  <div
    style={{
      width: '100%',
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 16,
      display: 'flex',
      justifyContent: 'center',
      fontSize,
    }}
  >
    {children}
  </div>
);

export default FooterContainer;
