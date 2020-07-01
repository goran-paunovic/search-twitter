var ranges = [
  { divider: 1e18, suffix: "E" },
  { divider: 1e15, suffix: "P" },
  { divider: 1e12, suffix: "T" },
  { divider: 1e9, suffix: "G" },
  { divider: 1e6, suffix: "M" },
  { divider: 1e3, suffix: "K" },
];

export function formatTweetCount(n) {
  for (var i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      const quotient = Math.floor(n / ranges[i].divider);
      const remainder = n % ranges[i].divider;

      const remainderString =
        remainder > 99 ? "." + remainder.toString().charAt(0) : "";
      return quotient.toString() + remainderString + ranges[i].suffix;
    }
  }
  return n.toString();
}
