const numberFormatter = Intl.NumberFormat('pt-BR');
const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatNumber = value => numberFormatter.format(value);

const formatMoney = value => moneyFormatter.format(value);

const formatPercentage = value => `(${value.toFixed(2).replace('.', ',')}%)`;

export { formatNumber, formatMoney, formatPercentage };