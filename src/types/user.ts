
export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  avatar?: string;
  avatarPublicId?: string;
  address?: string;
  phone?: string;
  emailVerified?: boolean;
}
