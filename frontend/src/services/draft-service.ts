import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const DRAFTS_API = `${API_BASE}/api/drafts`;

export const likeDraft = (draftId: string) => {
  return axios
    .put(`${DRAFTS_API}/${draftId}`, {}, { withCredentials: true })
    .then((res) => {
      return res.data;
    });
};
