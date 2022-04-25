import { Schema } from 'mongoose';

const schema = new Schema(
  {
    title: String,
    author: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'UsersModel' }],
    comments: [
      {
        postedBy: { type: Schema.Types.ObjectId, ref: 'UsersModel' },
        comment: String,
      },
    ],
    ratings: [Number],
  },
  { collection: 'poems' }
);

export default schema;
