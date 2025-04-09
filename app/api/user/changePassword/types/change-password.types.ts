export interface ChangePasswordBody {
  userId: string | undefined;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
