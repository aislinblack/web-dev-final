import { Schema } from 'mongoose';

const schema = new Schema(
  {
    critics: [{ type: Schema.Types.ObjectId, ref: 'UsersModel' }],
    text: String,
    rating: Number,
  },
  { collection: 'reviews' }
);

export default schema;
