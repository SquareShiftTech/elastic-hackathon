import React from "react";

import "./header.css";
import { useNavigate } from "react-router-dom";
import SqsLogo from "../../assets/square.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-container-block">
        {/* <Link
          href="/"
          className="text-vibrant-blue font-medium hover:text-vibrant-purple transition-colors">
          Upload
        </Link>
        <Link
          href="/dashboard"
          className="text-vibrant-blue font-medium hover:text-vibrant-purple transition-colors">
          Dashboard
        </Link> */}

        {/* <h2 className="text-xl font-bold sqs-label"> */}
        <img
          src={SqsLogo}
          alt="SQS"
          width={200}
          height={200}
          onClick={() => {
            navigate("/");
          }}
        />
        {/* </h2> */}
        <div
          className="edc-upload-label"
          onClick={() => {
            navigate("/history");
          }}>
          Records
        </div>
      </div>
    </div>
  );
};
