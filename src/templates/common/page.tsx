import React from 'react';

export interface PageProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
}

const Page: React.FunctionComponent<PageProps> = ({ children }: PageProps) => (
  <div className="pdf-c-page">{children}</div>
);

export default Page;
