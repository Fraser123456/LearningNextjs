"use client";
import React from "react";

const Register = () => {
  return (
    <div className="w-full grid sm:grid-cols-4 grid-cols-2">
      <div className="card bg-base-100 shadow-xl col-span-2 col-start-1 sm:col-start-2">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
