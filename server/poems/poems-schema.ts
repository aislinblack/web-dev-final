import { Schema } from 'mongoose';

const schema = new Schema(
  {
    title: String,
    author: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'UsersModel' }],
    comments: [
      {
        postedByName: String,
        postedById: { type: Schema.Types.ObjectId, ref: 'UsersModel' },
        comment: String,
      },
    ],
  },
  { collection: 'poems' }
);

export default schema;
