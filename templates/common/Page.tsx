import React from 'react';

export interface PageProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
}

const Page: React.FunctionComponent<PageProps> = ({ children }: PageProps) => (
  <div
    style={{
      pageBreakAfter: 'always',
      marginTop: 32,
    }}
  >
    {children}
  </div>
);

export default Page;
