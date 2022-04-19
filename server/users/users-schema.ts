import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: String,
    firstName: String,
    lastName: { type: String },
  },
  { collection: 'users' }
);

export default usersSchema;
