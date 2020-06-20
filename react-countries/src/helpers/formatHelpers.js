const formatter = Intl.NumberFormat('pr-BR');

const formatNumber = value => formatter.format(value);

export { formatNumber };