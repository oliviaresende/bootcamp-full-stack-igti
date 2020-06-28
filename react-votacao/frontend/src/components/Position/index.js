import React from 'react';

import css from './position.module.css';

const Position = ({ children }) => (
  <div className={`blue-grey-text text-lighten-5 ${css.position}`}>{children}</div>
);

export default Position;