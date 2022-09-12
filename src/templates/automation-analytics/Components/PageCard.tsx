import React, { FC, useContext } from 'react';
import { Card } from '@patternfly/react-core';
import PageOptionsContext from '../PageOptionsContext';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  isOpen?: boolean;
  title?: string;
  variant?: string;
}

const PageCard: FC<Props> = ({ children }) => {
  const { pageWidth, pageHeight } = useContext(PageOptionsContext);
  return (
    <Card
      isPlain
      style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}
    >
      {children}
    </Card>
  );
};

export default PageCard;
