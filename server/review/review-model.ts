import mongoose from 'mongoose';
import reviewSchema from './reviews-schema';

const poemModel = mongoose.model('ReviewModel', reviewSchema);

export default poemModel;
