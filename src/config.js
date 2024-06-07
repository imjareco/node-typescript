const url = (version = 'v1') => `/api/${version}`;

export const endpoint = {
    base: url(),
    auth: url().concat('/auth'),
    user: url().concat('/user'),
};
