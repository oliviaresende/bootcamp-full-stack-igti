import React from 'react';

import { formatMoneyPositiveNegative, formatMoney, formatPercent } from '../../utils/formatter'

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    border: '1px solid lightgray',
    borderRadius: '4px',
    padding: '4px',
    margin: '4px',
  },
};

const Installment = ({ data }) => {
  const { id, value, difference, percentage, profit } = data;

  const classGoodValue = 'green-text darken-4';
  const classGoodPercent = 'blue-text darken-4';
  const classBadValue = 'red-text darken-4';
  const classBadPercent = 'orange-text darken-4';

  const classValue = profit ? classGoodValue : classBadValue;
  const classPercent = profit ? classGoodPercent : classBadPercent;

  return (
    <div className="col s6 m3 l2">
      <div style={styles.flexRow}>
        <span style={{ marginRight: '5px' }}>
          <strong>{id}</strong>
        </span>

        <div>
          <div className={classValue}>
            <strong>{formatMoney(value)}</strong>
          </div>

          <div className={classValue}>
            <strong>{formatMoneyPositiveNegative(difference)}</strong>
          </div>

          <div className={classPercent}>
            <strong>{formatPercent(percentage)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Installment;