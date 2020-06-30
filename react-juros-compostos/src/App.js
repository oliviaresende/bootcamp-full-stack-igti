import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Installments from './components/Installments';

const App = () => {
  const [initalValue, setInitialValue] = useState(1000);
  const [monthlyInterest, setMonthlyInterest] = useState(1);
  const [monthlyPeriod, setMonthlyPeriod] = useState(1);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    const newInstallments = [];
    let currentValue = initalValue;
    let percentage = 0;

    for (let i = 1; i <= monthlyPeriod; i++) {
      const percentValue = (currentValue * Math.abs(monthlyInterest)) / 100;

      currentValue = monthlyInterest >= 0 ? currentValue + percentValue : currentValue - percentValue;

      percentage = (currentValue / initalValue - 1) * 100;

      newInstallments.push({
        id: i,
        value: currentValue,
        difference: currentValue - initalValue,
        percentage,
        profit: monthlyInterest > 0,
      });
    }
    setInstallments(newInstallments);
  }, [initalValue, monthlyInterest, monthlyPeriod]);

  const handleChangeValue = newValue => setInitialValue(newValue);

  const handleChangeInterest = newInterest => setMonthlyInterest(newInterest);

  const handleChangePeriod = newPeriod => setMonthlyPeriod(newPeriod);

  return (
    <div className="container">
      <h1 className="center">React Juros Compostos</h1>

      <Form
        data={{ initalValue, monthlyInterest, monthlyPeriod }}
        onChangeValue={handleChangeValue}
        onChangeInterest={handleChangeInterest}
        onChangePeriod={handleChangePeriod}
      />

      <Installments data={installments} />
    </div>
  );
}

export default App;
