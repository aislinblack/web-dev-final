export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'author' | 'reader' | 'critic';
  _id: string;
};
