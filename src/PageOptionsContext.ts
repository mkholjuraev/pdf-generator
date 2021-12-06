import React from 'react';

export interface PageOptionsContextType {
  pageWidth: number;
  pageHeight: number;
}

const PageOptionsContext = React.createContext<PageOptionsContextType>({
  pageWidth: 800,
  pageHeight: 600,
});

export default PageOptionsContext;
