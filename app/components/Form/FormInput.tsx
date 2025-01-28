"use client";
import React, { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: "text" | "number" | "password";
  className?: string | undefined;
}

const FormInput = ({
  name,
  label,
  type = "text",
  className,
  ...props
}: Props) => {
  const { control } = useFormContext();

  const labelClass = `form-control ${
    className ? className : "w-full max-w-xs"
  }`;

  const inputClass = `input input-bordered ${
    className ? className : "w-full max-w-xs"
  }`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        console.log(error);
        return (
          <label className={labelClass}>
            <div className="label">
              <span className="label-text">{label}</span>
            </div>
            <input
              {...field}
              {...props}
              type={type}
              className={inputClass}
              value={field.value ?? ""}
            />
            {error && (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {error.message}
                </span>
              </div>
            )}
          </label>
        );
      }}
    />
  );
};

export default FormInput;
