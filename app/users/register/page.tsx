import React from "react";

//Form Valdation
import RegisterForm from "./components/RegisterForm";

const Register = () => {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-1">
      <div className="card bg-base-100 shadow-xl col-start-1 sm:col-start-2">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <p className="text-gray-500">Please enter your details.</p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
