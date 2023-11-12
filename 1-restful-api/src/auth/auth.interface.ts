export interface Profile {
  userId?: string;
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  subscribeToNewsletter: boolean;
}

export interface ChangePassword {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
