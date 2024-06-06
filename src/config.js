const url = (version = 'v1') => `/api/${version}`;

module.exports = {
  endpoint: {
    base: url(),
    auth: url().concat('/auth'),
    user: url().concat('/user'),
  },
};
