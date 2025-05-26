// import type { ChangeEventHandler, EventHandler } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { SignupInput } from "saikrishna-zod-validations-medium";

export const Auth = () => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex h-screen justify-center">
      <div className="flex justify-center flex-col">
        <h1> Create an Account </h1>
        <p>
          Already have an account?{" "}
          <Link to={"/signin"} className="pl-2 underline">
            {" "}
            Login{" "}
          </Link>
        </p>
        <LabelledInputs
          label="Name"
          placeholder="sai"
          onChange={(e) =>
            setPostInputs({
              ...postInputs,
              name: e.target.value,
            })
          }
        />
        <LabelledInputs
          label="Email"
          placeholder="xxxx@xxx.com"
          onChange={(e) =>
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            })
          }
        />
        <LabelledInputs
          label="Password"
          type={"password"}
          placeholder="Enter your Password"
          onChange={(e) =>
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

interface LabelledInputsTypes {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInputs({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputsTypes) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 pt-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id="first_name"
        type={type || "text"}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
