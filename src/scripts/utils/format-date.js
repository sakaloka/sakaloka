export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateRange(startDateStr, endDateStr) {
  const start = formatDate(startDateStr);
  const end = formatDate(endDateStr);

  if (start === end) return start;
  return `${start} - ${end}`;
}
