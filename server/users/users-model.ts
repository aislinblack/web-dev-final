import mongoose from 'mongoose';
import usersSchema from './users-schema';

const usersModel = mongoose.model('UsersModel', usersSchema);

export default usersModel;
