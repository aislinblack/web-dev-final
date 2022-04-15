import poemsModel from './poems-model';

export const findAllPoems = () => poemsModel.find();
export const findPoemByAuthorAndTitle = (author, title) =>
  poemsModel.findOne({ author, title });
export const findPoemById = (id: string) => poemsModel.findById(id);
export const createPoem = (poem) => poemsModel.create(poem);
export const deletePoem = (pid) => poemsModel.deleteOne({ _id: pid });
export const updatePoem = (pid, poem) =>
  poemsModel.updateOne({ _id: pid }, { $set: poem });

export default { findAllPoems, createPoem, deletePoem, updatePoem };
