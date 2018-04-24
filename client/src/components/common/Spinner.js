import React from 'react';
import spinner from '../../assets/loading3.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="loading..."
      />
    </div>
  );
};
