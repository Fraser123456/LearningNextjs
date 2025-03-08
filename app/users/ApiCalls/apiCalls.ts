import { RegisterUserBody } from "@/app/api/register/types";

export async function RegisterUserCall(data: RegisterUserBody) {
  debugger;
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}
