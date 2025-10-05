/**
 * Datetime utilities for Indonesia timezone (Asia/Jakarta)
 * Using native Intl.DateTimeFormat for zero dependencies
 */

const TIMEZONE = 'Asia/Jakarta';
const LOCALE = 'id-ID';

/**
 * Format date/time for Indonesia with custom pattern
 */
export const formatDateTime = (
  date: Date = new Date(),
  options?: Intl.DateTimeFormatOptions
): string => {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIMEZONE,
    ...options,
  }).format(date);
};

/**
 * Get formatted clock display: "Sen, 05 Okt 2025 • 14:30:45 (WIB)"
 */
export const getClockDisplay = (date: Date = new Date()): string => {
  const dayName = formatDateTime(date, { weekday: 'short' });
  const day = formatDateTime(date, { day: '2-digit' });
  const month = formatDateTime(date, { month: 'short' });
  const year = formatDateTime(date, { year: 'numeric' });
  const time = formatDateTime(date, { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  });
  
  return `${dayName}, ${day} ${month} ${year} • ${time} (WIB)`;
};

/**
 * Get time only: "14:30:45"
 */
export const getTimeDisplay = (date: Date = new Date()): string => {
  return formatDateTime(date, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

/**
 * Get date only: "Sen, 05 Okt 2025"
 */
export const getDateDisplay = (date: Date = new Date()): string => {
  const dayName = formatDateTime(date, { weekday: 'short' });
  const day = formatDateTime(date, { day: '2-digit' });
  const month = formatDateTime(date, { month: 'short' });
  const year = formatDateTime(date, { year: 'numeric' });
  
  return `${dayName}, ${day} ${month} ${year}`;
};

/**
 * Get relative time: "2 jam yang lalu", "Baru saja"
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  if (diffDay < 7) return `${diffDay} hari yang lalu`;
  
  return getDateDisplay(date);
};
