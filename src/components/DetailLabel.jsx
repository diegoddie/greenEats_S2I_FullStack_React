import React from 'react';

const DetailLabel = ({ label, color }) => {
  const labelStyle = {
    backgroundColor: color,
  };

  return (
    <div className="rounded-full px-2 py-1 m-1 whitespace-nowrap" style={labelStyle}>
      {label}
    </div>
  );
};

export default DetailLabel;
