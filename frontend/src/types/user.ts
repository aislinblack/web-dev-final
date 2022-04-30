export type User = CriticProfile | AuthorProfile | ReaderProfile;

type CriticProfile = {
  role: 'critic';
  criticProfile: {
    organization: string;
  };
} & GeneralAttributes;

type AuthorProfile = {
  role: 'author';
  authorProfile: { inspirations: string[] };
} & GeneralAttributes;

type ReaderProfile = {
  role: 'reader';
  readerProfile: {};
} & GeneralAttributes;

type GeneralAttributes = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'author' | 'reader' | 'critic';
  _id: string;
  followers: string[];
  following: string[];
  dateJoined: string | null;
};
