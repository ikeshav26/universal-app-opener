export function normalizeUrl(input: string): string {
  let urlStr = input.trim();

  // 1. Ensure protocol
  if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
    urlStr = 'https://' + urlStr;
  }

  let url: URL;
  try {
    url = new URL(urlStr);
  } catch {
    return input; // fallback safely
  }

  // 2. Normalize hostname
  if (url.hostname.startsWith('m.')) {
    url.hostname = url.hostname.slice(2);
  }

  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.slice(4);
  }

  // 3. Remove tracking params
  for (const key of Array.from(url.searchParams.keys())) {
    if (key.startsWith('utm_')) {
      url.searchParams.delete(key);
    }
  }

  // 4. Normalize trailing slash
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.toString();
}
