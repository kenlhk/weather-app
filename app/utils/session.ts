import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET || 'defaultsecret';

const storage = createCookieSessionStorage({
  cookie: {
    name: 'weatherapp_session',
    secure: process.env.NODE_ENV === 'development',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});

export const getSession = async (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'));
};

export const commitSession = async (session: any) => {
  return storage.commitSession(session);
};

export const destroySession = async (session: any) => {
  return storage.destroySession(session);
};

export const requireUserSession = async (request: Request) => {
  const session = await getSession(request);
  if (!session.has('userId')) {
    throw redirect('/login');
  }
  return session;
};
