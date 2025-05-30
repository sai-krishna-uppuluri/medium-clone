// import type { ChangeEventHandler, EventHandler } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SigninInput } from "saikrishna-zod-validations-medium";
import { LabelledInputs } from "./LabelledInputs";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SigninAuth = () => {
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      const sendSignInRequest = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );

      const responseFromSignInRequest = sendSignInRequest.data;
      console.log(responseFromSignInRequest);
      navigate("/blog");
    } catch (error) {
      const responseErrorMessage = error?.response.data.error;
      alert(responseErrorMessage);
    }
  };

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
          <Button type="Sign in" width={"w-full"} onClick={signInHandler} />
        </div>
      </div>
    </div>
  );
};
