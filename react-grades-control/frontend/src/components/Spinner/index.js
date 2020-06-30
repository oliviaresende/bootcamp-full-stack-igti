import React from 'react';

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Spinner = () => (
  <div style={styles.flexRow}>
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

    <span style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Aguarde...</span>
  </div>
);

export default Spinner;