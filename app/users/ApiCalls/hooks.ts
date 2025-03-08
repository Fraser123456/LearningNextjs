import { useMutation } from "@tanstack/react-query";
import { RegisterUserCall } from "./apiCalls";
import { RegisterUserBody, RegisterResponse } from "@/app/api/register/types";

type Error = {
  error?: string;
  errors?: { message: string }[];
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterUserBody>({
    mutationFn: RegisterUserCall,
  });
};
