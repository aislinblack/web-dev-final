// import mongoose from 'mongoose';
import mongoose from 'mongoose';
import poemSchema from './poems-schema';

const poemModel = mongoose.model('TuitModel', poemSchema);

export default poemModel;
