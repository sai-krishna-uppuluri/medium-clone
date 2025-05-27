// import type { ChangeEventHandler, EventHandler } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { SigninInput } from "saikrishna-zod-validations-medium";
import { LabelledInputs } from "./LabelledInputs";
import { Button } from "./Button";

export const SigninAuth = () => {
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  return (
    <div className="flex h-screen justify-center">
      <div className="flex justify-center flex-col">
        <>
          <p>
            Don`t have an account?{" "}
            <Link to={"/signup"} className="pl-2 underline">
              Sign Up
            </Link>
          </p>
        </>
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
        <div className="mt-8">
          <Button type="Sign in" width={"w-full"} />
        </div>
      </div>
    </div>
  );
};
