export function formatDateTime(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("de-DE");
}

export function formatPercent(value) {
  const number = Number(value || 0);
  return `${number.toFixed(2)} %`;
}
