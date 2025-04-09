"use client";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

//Components
import { Form, FormInput } from "@/app/components/Form";

//Constants
import { RegisterFormFields } from "../types/register-form.types";

//Types
import { RegisterUserBody } from "@/app/api/register/types";

//Hooks
import { useRegister } from "../../ApiCalls/hooks";

const RegisterForm = () => {
  const router = useRouter();
  const {
    mutateAsync: register,
    isPending,
    error,
    isError,
    isSuccess,
  } = useRegister();

  const schema = yup.object({
    fullName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(14),
    passwordConfirmation: yup
      .string()
      .min(14)
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (data: RegisterFormFields) => {
    const payload: RegisterUserBody = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      username: data.username,
    };
    await register(payload);
  };

  useEffect(() => {
    debugger;
    if (isError) console.log(error);
    if (isSuccess) router.push("/api/auth/signin");
  }, [isSuccess, isError]);

  return !isPending ? (
    <Form<RegisterFormFields>
      schema={schema}
      onSubmit={handleSubmit}
      defaultValues={{
        fullName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
    >
      <FormInput name="fullName" label="Full Name" className="w-full" />
      <FormInput name="username" label="Username" className="w-full" />
      <FormInput name="email" label="Email" className="w-full" />
      <FormInput
        name="password"
        label="Password"
        type={"password"}
        className="w-full"
      />
      <FormInput
        name="passwordConfirmation"
        label="Confirm Password"
        type={"password"}
        className="w-full"
      />
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </Form>
  ) : (
    <div>Loading...</div>
  );
};

export default RegisterForm;
