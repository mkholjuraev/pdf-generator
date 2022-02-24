import React from 'react';
import HeaderContainer from './header-container';
import HeaderDate from './header-date';
import HeaderLogo from './header-logo';

const CommonHeader = () => {
  return (
    <HeaderContainer>
      <HeaderLogo />
      <HeaderDate />
    </HeaderContainer>
  );
};

export default CommonHeader;
