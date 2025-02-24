import Cookies from 'js-cookie';

const REQUEST_COUNT_KEY = 'request_count';
export const MAX_REQUESTS = 3;

export function incrementRequestCount(): number {
  const currentCount = Number(Cookies.get(REQUEST_COUNT_KEY) || 0);
  const newCount = currentCount + 1;
  Cookies.set(REQUEST_COUNT_KEY, String(newCount), { expires: 1 });
  return newCount;
}

export function getRequestCount(): number {
  return Number(Cookies.get(REQUEST_COUNT_KEY) || 0);
}

export function hasReachedLimit(): boolean {
  return getRequestCount() >= MAX_REQUESTS;
}

export function resetRequestCount(): void {
  Cookies.remove(REQUEST_COUNT_KEY);
}
