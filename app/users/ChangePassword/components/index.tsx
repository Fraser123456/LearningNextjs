"use-client";
import React from "react";
import * as yup from "yup";
import { useSession } from "next-auth/react";

//Components
import { Form, FormInput } from "@/app/components/Form";

//Types
import { ChangePasswordFormFields } from "../types/change-password.types";
import { ChangePasswordBody } from "@/app/api/user/changePassword/types/change-password.types";

const ChangePasswordForm = () => {
  const { data } = useSession();

  const schema = yup.object({
    currentPassword: yup.string().required().min(14),
    newPassword: yup.string().required().min(14),
    confirmPassword: yup
      .string()
      .min(14)
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: ChangePasswordFormFields) => {
    const body: ChangePasswordBody = {
      currentPassword,
      newPassword,
      confirmPassword,
      userId: data?.user.id,
    };

    console.log(`Body: ${body}`);
  };

  return (
    <Form<ChangePasswordFormFields>
      schema={schema}
      onSubmit={handleSubmit}
      defaultValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
    >
      <FormInput
        name="currentPassword"
        label="Current Password"
        type="text"
        className="w-full"
      />
      <FormInput
        name="newPassword"
        label="New Password"
        type="text"
        className="w-full"
      />
      <FormInput
        name="confirmPassword"
        label="Confirm Password"
        type="text"
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

export default ChangePasswordForm;
