export interface RegisterUserBody {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
}
