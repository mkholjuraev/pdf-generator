import React from 'react';

const HeaderTemplate = () => (
  <div
    style={{
      fontFamily: 'Red Hat Text',
      fontStyle: 'italic',
      fontSize: 9,
      color: '#ccc',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 0,
      margin: 'auto',
      width: '297mm',
      content: '',
      display: 'flex',
      transform: 'scale(0.75)',
      transformOrigin: 'top left',
    }}
  >
    <div style={{ flexGrow: 1, width: '33.33%' }}>
      <img
        style={{ height: '1cm', margin: '0.5cm' }}
        src="/images/aalogo.svg"
      />
    </div>
    <div
      style={{
        flexGrow: 1,
        width: '33.33%',
        textAlign: 'center',
        paddingTop: '5mm',
      }}
    >
      <p>
        <span className="title"></span>
      </p>
    </div>
    <div
      style={{
        flexGrow: 1,
        textAlign: 'right',
        width: '33.33%',
        paddingRight: 5,
        paddingTop: '5mm',
      }}
    >
      <p>
        Prepared: <span className="date"></span> | Page{' '}
        <span className="pageNumber"></span> of{' '}
        <span className="totalPages"></span>
      </p>
    </div>
  </div>
);

export default HeaderTemplate;
