import userModel from './users-model';

const findAllUsers = () => {
  return userModel.find();
};

const findAllUsersNotFollowedById = (id) => {
  return userModel.find({
    $nor: [{ followers: { $all: [id] } }, { _id: id }],
  });
};

const findUserById = (id) => {
  return userModel.findById(id);
};
const findUserByEmail = (email) => userModel.findOne({ email });

const findUsersByRole = (role) => userModel.find({ role });

const findUserByCredentials = (email, password) =>
  userModel.findOne({ email, password });

const createUser = (user) => userModel.create(user);
const updateUser = (id, user) =>
  userModel.updateOne({ _id: id }, { $set: user });

const updateFollowersList = (personToFollow, personFollowing) => {
  return userModel.updateOne(
    { _id: personToFollow },
    { $push: { followers: personFollowing } }
  );
};

const updateFollowingList = (personToFollow, personFollowing) => {
  return userModel.updateOne(
    { _id: personFollowing },
    { $push: { following: personToFollow } }
  );
};

const deleteUser = (id) => userModel.deleteOne({ _id: id });

export default {
  findUserByCredentials: findUserByCredentials,
  findUserById: findUserById,
  findAllUsers: findAllUsers,
  findUserByEmail: findUserByEmail,
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  findUsersByRole,
  findAllUsersNotFollowedById,
  updateFollowersList,
  updateFollowingList,
};
