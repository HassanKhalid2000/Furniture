"use client";
import React, { useRef, useState } from "react";
import { useUserContext } from "../context/userContext";

const Register = () => {
  const [error, setError] = useState("");
  const { login } = useUserContext();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    const fullName = fullNameRef.current?.value;
    const address = addressRef.current?.value;
    const phoneNumber = phoneNumberRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const avatar = uploadRef.current?.value;
    if (
      !email ||
      !address ||
      !phoneNumber ||
      !password ||
      !avatar ||
      !fullName
    ) {
      setError("check submitted data");
      return;
    }
    const response = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        address,
        phoneNumber,
        email,
        password,
        avatar,
      }),
    });
    if (!response.ok) {
      setError("unable to register , plese try diffrent creaditantial");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("token is not provided");
    }
    login(email, token);
    console.log(token);
  };
  return (
    <>
      <div className="form-container  flex flex-col items-center my-10">
        <h1>create new account</h1>
        <div className="border shadow-xl flex flex-col p-5 gap-3">
          <span>what is your Name?</span>
          <input
            className=""
            type="text"
            name="fullName"
            ref={fullNameRef}
            placeholder="Type Here .."
            id=""
          />

          <span>what is your address ?</span>
          <input
            type="text"
            name="address"
            ref={addressRef}
            placeholder="Type Here .."
            id=""
          />

          <span>what is your phone number?</span>
          <input
            type="text"
            name="phoneNumber"
            ref={phoneNumberRef}
            placeholder="Type Here .."
            id=""
          />

          <span>what is your email ?</span>
          <input
            type="text"
            name="email"
            ref={emailRef}
            placeholder="Type Here .."
            id=""
          />

          <span>what is your password ?</span>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="Type Here .."
            id=""
          />
          <span>upload your photo</span>
          <input type="file" ref={uploadRef} name="avatar" id="" />
          <button onClick={handleSubmit} className="secbtn">
            register
          </button>
          {error && <div className="text-2xl text-red-500"> {error}</div>}
        </div>
      </div>
    </>
  );
};

export default Register;
