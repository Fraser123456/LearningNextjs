"use client";
import React from "react";
import * as yup from "yup";

//Components
import Form from "@/app/components/Form/Form";
import FormInput from "@/app/components/Form/FormInput";

//Interfaces
interface FormFields {
  fullName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterForm = () => {
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

  const handleSubmit = (data: FormFields) => {
    console.log(data);
  };
  return (
    <Form<FormFields>
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
  );
};

export default RegisterForm;
