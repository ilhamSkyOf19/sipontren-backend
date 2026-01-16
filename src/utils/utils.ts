export function getStartOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0); // mulai 00:00:00
  return d;
}

export const getTodayLocal = (date: Date = new Date()): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};

// get iso
export function getNowLocalISO(): string {
  const now = new Date();

  // ambil offset lokal dalam menit
  const offset = now.getTimezoneOffset(); // misal WIB: -420 menit
  const localTime = new Date(now.getTime() - offset * 60 * 1000);

  return localTime.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"
}

export function getEndOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

// get start month
export function getStartOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
}

// get end month
export function getEndOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
}

export const toStartOfDay = (date: string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const toEndOfDay = (date: string) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};
