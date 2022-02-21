import React from 'react';

export interface PageOptionsContextType {
  pageWidth: number;
  pageHeight: number;
  chartSeriesHiddenProps: boolean[];
}

const PageOptionsContext = React.createContext<PageOptionsContextType>({
  pageWidth: 800,
  pageHeight: 600,
  // TODO Temporary
  chartSeriesHiddenProps: [],
});

export default PageOptionsContext;
