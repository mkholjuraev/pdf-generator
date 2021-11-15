import React, { useContext } from 'react';
import { Card } from '@patternfly/react-core';
import PageOptionsContext from '../PageOptionsContext';

const PageCard = ({ children }) => {
  const { pageWidth, pageHeight } = useContext(PageOptionsContext);
  return (
    <Card isPlain style={{ width: pageWidth, height: pageHeight }}>
      {children}
    </Card>
  );
};

export default PageCard;
