import { IncomingMessage } from 'http';

import absoluteUrl from 'next-absolute-url';

const fetchWithUrl = (
  req: IncomingMessage,
  query: string,
  data?: RequestInit
): Promise<Response> => {
  const { origin } = absoluteUrl(req);
  return fetch(`${origin}${query}`, data);
};

export default fetchWithUrl;
