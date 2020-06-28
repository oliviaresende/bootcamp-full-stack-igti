import React from 'react';

import css from './spinner.module.css';

const Spinner = ({ description }) => (
  <div className={css.flexRow}>
    <div className="preloader-wrapper small active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
    <div style={{ fontSize: '2rem', marginLeft: '10px' }}>{description}</div>
  </div>
);

export default Spinner;