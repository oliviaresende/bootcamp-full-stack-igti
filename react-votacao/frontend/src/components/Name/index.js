import React from 'react';

const Name = ({ children }) => (
  <div
    className="card-title blue-grey-text text-lighten-5"
    style={{ fontSize: '30px', fontWeight: 'bold' }}
  >
    {children}
  </div>
)

export default Name;