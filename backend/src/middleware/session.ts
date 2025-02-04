import expressSession from 'express-session';

const session = () =>
  expressSession({
    secret: 'projectforge',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  });

export default session;