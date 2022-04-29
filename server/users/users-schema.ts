import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: String,
    firstName: String,
    lastName: { type: String },
    dateJoined: Date,
    authorProfile: {
      required: false,
      inspirations: { type: [String], default: [] },
    },
    criticProfile: {
      required: false,
      type: { organization: { type: String, default: 'Self-Employed' } },
    },
    readerProfile: { required: false },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel' }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel' }],
      default: [],
    },
  },
  { collection: 'users' }
);

export default usersSchema;
