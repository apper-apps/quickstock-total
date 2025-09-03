export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const parseCurrency = (value) => {
  const numericValue = parseFloat(value.toString().replace(/[^0-9.-]/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};