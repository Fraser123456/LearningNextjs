import { useMutation } from "@tanstack/react-query";

//Types
import { RegisterUserBody, RegisterResponse } from "@/app/api/register/types";
import { ChangePasswordBody } from "./../../api/user/changePassword/types/change-password.types";

//API Call
import { ChangePasswordCall, RegisterUserCall } from "./apiCalls";

type Error = {
  error?: string;
  errors?: { message: string }[];
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterUserBody>({
    mutationFn: RegisterUserCall,
  });
};

export const userChangePassword = () => {
  return useMutation<null, Error, ChangePasswordBody>({
    mutationFn: ChangePasswordCall,
  });
};
