/**
 * Format ISO date string ke lokal sesuai timezone
 * @param {string} dateStr - Tanggal dari server (ISO string)
 * @param {string} timeZone - Timezone user (contoh: 'Asia/Jakarta')
 * @param {string} locale - Locale (opsional, default: 'id-ID')
 * @returns {string} - Tanggal terformat
 */
export function formatDateByTimezone(dateStr, timeZone = 'Asia/Jakarta', locale = 'id-ID') {
  if (!dateStr) return '-';

  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatter.format(date);
}
