import React from 'react';

import css from './card.module.css';

const Card = ({ children }) => (
  <div className={`${css.cardExtra} card horizontal blue-grey darken-5`}> {children}</div >
);

export default Card;