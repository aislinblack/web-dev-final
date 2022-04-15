import { Schema } from 'mongoose';

const schema = new Schema(
  {
    title: String,
    author: String,
    likes: Number,
    comments: [
      {
        postedBy: String,
        comment: String,
      },
    ],
    ratings: [Number],
  },
  { collection: 'poems' }
);

export default schema;
