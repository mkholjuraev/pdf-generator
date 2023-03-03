import React from 'react';

type TextWithColorDotProps = {
  color: string;
};

const TextWithColorDot: React.FC<TextWithColorDotProps> = ({
  color,
  children,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        className="pf-u-mr-sm"
        style={{
          display: 'block',
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: color,
        }}
      ></span>
      <span className='pf-u-font-size-xs'>{children}</span>
    </div>
  );
};

export default TextWithColorDot;
