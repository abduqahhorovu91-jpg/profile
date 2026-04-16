export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
