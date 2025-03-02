import React from "react";
import { Navigate } from "react-router-dom";
import { Chat } from "../Chat/Chat";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? (
    <div>
      {children}
      <Chat />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
