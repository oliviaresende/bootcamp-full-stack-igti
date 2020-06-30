import React from 'react';
import Installment from '../Installment';

const Installments = ({ data }) =>
  (
    <div className="row">
      {data.map(item => <Installment key={item.id} data={item} />)}
    </div>
  );

export default Installments;