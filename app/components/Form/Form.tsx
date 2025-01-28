"use client";
import React, { InputHTMLAttributes, ReactNode } from "react";

//Form
import {
  useForm,
  SubmitHandler,
  FormProvider,
  DefaultValues,
} from "react-hook-form";

//Validation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//Constants
import { FormFields } from "./constants/constants";

interface Props<T extends FormFields> {
  children: ReactNode;
  schema: yup.ObjectSchema<T>;
  defaultValues?: DefaultValues<T>;
  className?: string | undefined;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FormFields>({
  children,
  schema,
  defaultValues,
  className,
  onSubmit,
}: Props<T>) => {
  const methods = useForm<T>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
