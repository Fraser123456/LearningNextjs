import { RegisterUserBody } from "@/app/api/register/types";
import { ChangePasswordBody } from "@/app/api/user/changePassword/types/change-password.types";

const headers = {
  "Content-Type": "application/json",
};

export async function RegisterUserCall(data: RegisterUserBody) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}

export async function ChangePasswordCall(data: ChangePasswordBody) {
  const response = await fetch("/api/user/changepassword", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  return response.json();
}
