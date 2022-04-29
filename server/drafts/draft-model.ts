import mongoose from 'mongoose';
import draftSchema from './draft-schema';

const draftModel = mongoose.model('DraftModel', draftSchema);

export default draftModel;
