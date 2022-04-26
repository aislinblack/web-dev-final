import userDao from '../users/users-dao';

const findAllUsers = async (req, res) => {
  const users = await userDao.findAllUsers();
  res.json(users);
};

const findUserById = async (req, res) => {
  const userId = req.params['id'];
  const user = await userDao.findUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};
const findUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await userDao.findUserByEmail(email);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};
const findUserByCredentials = async (req, res) => {
  const credentials = req.body;
  const { email, password } = credentials;
  const user = await userDao.findUserByCredentials(email, password);
  if (user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};
const createUser = async (req, res) => {
  const user = req.body;
  const insertedUser = await userDao.createUser(user);

  req.session.profile = insertedUser;
  res.json(insertedUser);
};
const updateUser = async (req, res) => {
  const user = req.body;
  const userId = req.params['id'];
  const status = await userDao.updateUser(userId, user);
  res.json(status);
};
const deleteUser = async (req, res) => {
  const userId = req.params['id'];
  const status = await userDao.deleteUser(userId);
  res.json(status);
};

const login = async (req, res) => {
  const credentials = req.body;
  const profile = await userDao.findUserByCredentials(
    credentials.email,
    credentials.password
  );

  if (profile) {
    req.session['profile'] = profile;
    console.log(req.session);

    return res.json({ status: 200, user: profile });
  }
  res.json({ status: 403 });
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const profile = (req, res) => {
  res.json(req.session['profile']);
};

export default (app) => {
  app.get('/api/users', findAllUsers);
  app.get('/api/users/:id', findUserById);
  app.get('/api/users/email/:email', findUserByEmail);
  app.post('/api/users/credentials', findUserByCredentials);
  app.post('/api/users/login', login);
  app.post('/api/users/logout', logout);
  app.post('/api/users/profile', profile);
  app.post('/api/users', createUser);
  app.put('/api/users/:id', updateUser);
  app.delete('/api/users/:id', deleteUser);
};
