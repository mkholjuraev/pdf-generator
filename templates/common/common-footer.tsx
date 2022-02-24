import React from 'react';

const CommonFooter = () => (
  <div
    style={{
      fontFamily: 'Red Hat Text',
      fontStyle: 'italic',
      fontSize: 9,
      color: '#ccc',
      width: '100%',
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 16,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    Page&nbsp;<span className="pageNumber"></span>/
    <span className="totalPages"></span>
  </div>
);

export default CommonFooter;
