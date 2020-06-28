import React from 'react';

import CountUp from 'react-countup';

const Votes = ({ value, previous }) => (
  <div>
    <CountUp start={previous || 0} end={value} duration={0.6} separator=".">
      {({ countUpRef }) => (
        <div>
          <span ref={countUpRef} />
        </div>
      )}
    </CountUp>
  </div>
);

export default Votes;