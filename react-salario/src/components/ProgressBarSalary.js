import React from 'react';

const ProgressBarSalary = ({
  percentINSS,
  percentIRPF,
  percentNetSalary,
  colorINSS,
  colorIRPF,
  colorNetSalary,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div
        style={{
          backgroundColor: colorINSS,
          width: percentINSS + '%',
          height: '20px',
        }}
      ></div>

      <div
        style={{
          backgroundColor: colorIRPF,
          width: percentIRPF + '%',
          height: '20px',
        }}
      ></div>

      <div
        style={{
          backgroundColor: colorNetSalary,
          width: percentNetSalary + '%',
          height: '20px',
        }}
      ></div>
    </div>
  );
}

export default ProgressBarSalary;
