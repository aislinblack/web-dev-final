// import mongoose from 'mongoose';
import mongoose from 'mongoose';
import poemSchema from './poems-schema';

const poemModel = mongoose.model('PoemModel', poemSchema);

export default poemModel;
