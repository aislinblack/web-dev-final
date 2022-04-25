import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: String,
    firstName: String,
    lastName: { type: String },
    authorProfile: { required: false },
    criticProfile: { required: false },
    readerProfile: {},
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
  },
  { collection: 'users' }
);

export default usersSchema;
