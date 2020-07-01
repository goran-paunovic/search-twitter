export function getMonthYearCreatedAt(createdAt) {
  const dateParts = createdAt.split(" ");

  return dateParts[1] + " " + dateParts[5];
}
