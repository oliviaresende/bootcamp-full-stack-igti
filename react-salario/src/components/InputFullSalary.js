import React from 'react'

const InputFullSalary = ({ currentValue, onSalaryChange }) => {
  const handleChange = event => {
    const newValue = +event.target.value;
    onSalaryChange(newValue);
  };
  return (
    <div className="input-field col s12">
      <input
        autoFocus
        id="inputFullSalary"
        type="number"
        value={currentValue}
        onChange={handleChange}
        min="1000"
        step="100"
      />
      <label className="active" htmlFor="inputFullSalary">
        Salário bruto
        </label>
    </div>
  );
}

export default InputFullSalary;
