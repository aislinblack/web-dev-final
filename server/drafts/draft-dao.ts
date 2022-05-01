import draftModel from './draft-model';

export const findAllDrafts = () => draftModel.find();
export const findDraftById = (id: string) => draftModel.findById(id);
export const createDraft = (draft) => draftModel.create(draft);
export const deleteDraft = (did) => draftModel.deleteOne({ _id: did });
export const updateDraft = (did, draft) =>
  draftModel.updateOne({ _id: did }, { $set: draft });

export const findDraftByAuthorId = (aid: string) =>
  draftModel.find({ author: aid });

const likeDraft = (pid, userId) =>
  draftModel.updateOne({ _id: pid }, { $push: { likes: userId } });

export default {
  findAllDrafts,
  createDraft,
  deleteDraft,
  updateDraft,
  findDraftByAuthorId,
  likeDraft,
};
