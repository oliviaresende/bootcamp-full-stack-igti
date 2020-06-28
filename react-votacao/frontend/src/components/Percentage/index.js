import React from 'react';

import CountUp from 'react-countup';

const Percentage = ({ value, previous }) => (
  <div>
    <CountUp
      start={previous || 0}
      end={value}
      duration={0.6}
      decimals={2}
      decimal=","
      suffix="%"
    >
      {({ countUpRef }) =>
        <div>
          <span ref={countUpRef} />
        </div>
      }
    </CountUp>
  </div>
);

export default Percentage;