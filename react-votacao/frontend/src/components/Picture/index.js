import React from 'react';

import css from './picture.module.css';

const Picture = ({ imageSource, description }) => (
  <div>
    <img
      className={`circle ${css.picture}`}
      src={imageSource}
      alt={description}
      title={description}
    />
  </div>
);

export default Picture;