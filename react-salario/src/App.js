import React, { useState, useEffect } from 'react';
import InputFullSalary from './components/InputFullSalary';
import InputReadOnly from './components/InputReadOnly';
import * as salaryHelpers from './helpers/salary';
import ProgressBarSalary from './components/ProgressBarSalary';

const COLOR_INSS = '#e67e22';
const COLOR_IRPF = '#c0392b';
const COLOR_NET_SALARY = '#16a085';

const App = () => {
  const [fullSalary, setFullSalary] = useState(1000);
  const [salary, setSalary] = useState({})
  useEffect(() => {
    setSalary(salaryHelpers.calculateSalaryFrom(fullSalary));
  }, [fullSalary])
  const percentINSS = (salary.discountINSS / fullSalary) * 100;
  const percentIRPF = (salary.discountIRPF / fullSalary) * 100;
  const percentNetSalary = 100 - percentINSS - percentIRPF;
  return (
    <div className="container">

      <h1 className="center">React Salário</h1>

      <div className="row">

        <InputFullSalary
          currentValue={fullSalary}
          onSalaryChange={newSalary => setFullSalary(newSalary)}
        />

        <InputReadOnly
          label="Base INSS:"
          value={salary.baseINSS}
        />

        <InputReadOnly
          label="Desconto INSS:"
          value={salary.discountINSS}
          percentage={percentINSS}
          color={COLOR_INSS}
        />

        <InputReadOnly
          label="Base IRPF:"
          value={salary.baseIRPF}
        />

        <InputReadOnly
          label="Desconto IRPF:"
          value={salary.discountIRPF}
          percentage={percentIRPF}
          color={COLOR_IRPF}
        />

        <InputReadOnly
          label="Salário líquido:"
          value={salary.netSalary}
          percentage={percentNetSalary}
          color={COLOR_NET_SALARY}
        />
      </div>
      <ProgressBarSalary
        percentINSS={percentINSS}
        colorINSS={COLOR_INSS}
        percentIRPF={percentIRPF}
        colorIRPF={COLOR_IRPF}
        percentNetSalary={percentNetSalary}
        colorNetSalary={COLOR_NET_SALARY}
      />
    </div>
  );
}

export default App;
