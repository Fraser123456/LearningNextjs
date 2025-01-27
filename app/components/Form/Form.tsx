import React, { FormEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleSubmit: (event: FormEvent) => void;
}

const Form = ({ children, handleSubmit }: Props) => {
  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
