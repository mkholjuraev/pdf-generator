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
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color,
        }}
      ></span>
      <span>{children}</span>
    </div>
  );
};

export default TextWithColorDot;
