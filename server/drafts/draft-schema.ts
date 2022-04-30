import { Schema } from 'mongoose';

const schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'UsersModel' },
    text: String,
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: 'UsersModel' }],
      default: [],
    },
    draftId: { type: Schema.Types.ObjectId, ref: 'DraftModel' },
    title: String,
    datePosted: { type: Date },
  },
  { collection: 'drafts' }
);

export default schema;
