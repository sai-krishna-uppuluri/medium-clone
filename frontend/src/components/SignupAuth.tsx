// import type { ChangeEventHandler, EventHandler } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "saikrishna-zod-validations-medium";
import { LabelledInputs } from "./LabelledInputs";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignupAuth = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      const jwt = response.data;
      console.log(jwt);
      localStorage.setItem("token", jwt);

      navigate("/signin");
    } catch (error) {
      const errorMessage = error?.response.data.error || "Something went wrong";
      return alert(errorMessage);
    }
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="flex justify-center flex-col">
        <>
          <h1> Create an Account </h1>
          <p>
            Already have an account?{" "}
            <Link to={"/signin"} className="pl-2 underline">
              Login
            </Link>
          </p>
        </>
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
        <div className="mt-8">
          <Button type="Sign Up" width={"w-full"} onClick={sendRequest} />
        </div>
      </div>
    </div>
  );
};
