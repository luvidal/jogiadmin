import { NextApiRequest, NextApiResponse } from 'next';

interface Endpoint {
  name: string;
  method: string; // GET, POST, PUT, DELETE, etc.
  authRequired?: boolean;
  handler: (req: NextApiRequest, res: NextApiResponse) => any;
}

const matchPath = (path: string, pattern: string) => {
  const regex = new RegExp(
    '^' + pattern.replace(/\[([^\]]+)\]/g, (_, p) => `(?<${p}>[^/]+)`) + '$'
  );
  return regex.exec(path);
};

const createHandler = (endpoints: Endpoint[]) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = (req.method || '').toUpperCase();
    const path = req.url?.split('?')[0]?.replace(/^\/api\/v1\//, '').replace(/\/$/, '') || '';

    const candidates = endpoints.filter(e => e.method === method);
    const matchEntry = candidates.find(e => matchPath(path, e.name));
    if (!matchEntry)
      return res.status(404).json({ error: 'Endpoint not found' });

    const match = matchPath(path, matchEntry.name);
    const params = match?.groups || {};

    if (matchEntry.authRequired && !checkAuth(req))
      return res.status(401).json({ error: 'Unauthorized' });

    req.query = { ...req.query, ...params };
    return matchEntry.handler(req, res);
  };
};

export default createHandler;

const checkAuth = (_req: NextApiRequest): boolean => true;
