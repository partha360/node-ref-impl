import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className={input.name}>
      <label>{label}</label>
      <textarea {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
