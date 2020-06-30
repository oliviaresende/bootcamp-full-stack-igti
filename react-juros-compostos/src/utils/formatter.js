const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatMoneyPositiveNegative = value => {
  const money = moneyFormatter.format(value);

  if (value >= 0) {
    return `+${money}`;
  }

  return money;
}

export const formatMoney = value => moneyFormatter.format(value);


export const formatPercent = value => value.toFixed(2).replace('.', ',') + '%';