export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface IProfile {
  username: string;
  email: string;
  role: string;
  description: string;
}
