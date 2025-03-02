import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMessage] = useState("Enter your email to receive a verification code.");
  const [isLoading, setIsLoading] = useState(false);

  const sendCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_LOGIN_DOMAIN}/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });

      const result = await response.json();
      if (result.success) {
        setIsCodeSent(true);
        setMessage("Code sent to your email. Please enter the code.");
      } else {
        setMessage("Failed to send the code. Invalid User ID.");
      }
    } catch (error) {
      setMessage("An error occurred while sending the code.");
    }
    setIsLoading(false);
  };

  const verifyCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_LOGIN_DOMAIN}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, authCode })
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem("token", authCode);
        localStorage.setItem("userName", userId);
        setMessage("Authentication successful!");
        navigate("/");
      } else {
        setMessage("Invalid code. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during verification.");
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="container">
        {!isCodeSent ? (
          <div id="auth-container">
            <input
              type="text"
              placeholder="Enter Email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button className="button" onClick={sendCode}>
              {isLoading ? (
                <Stack
                  sx={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  spacing={2}
                  direction="row">
                  <CircularProgress color="inherit" size="30px" />
                </Stack>
              ) : (
                "Send Code"
              )}
            </button>
          </div>
        ) : (
          <div id="verify-container">
            <input
              type="text"
              placeholder="Enter Authentication Code"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <button className="button" onClick={verifyCode}>
              {isLoading ? (
                <Stack
                  sx={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  spacing={2}
                  direction="row">
                  <CircularProgress color="inherit" size="30px" />
                </Stack>
              ) : (
                "Verify Code"
              )}
            </button>
          </div>
        )}

        <p className="message">{message}</p>
      </div>
    </div>
  );
};
