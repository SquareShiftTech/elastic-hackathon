import React from "react";

import companyLogo from "../../assets/squareshift2.png";
import elasticLogo from "../../assets/elastic.png";
import awsLogo from "../../assets/aws.png";

import "./header.css";

export const Header = () => {
  return (
    <div className="header">
      <div className="logos">
        <img src={companyLogo} alt="SquareShift" width={140} height={45} />
        <img src={elasticLogo} alt="Elastic" width={100} height={45} />
        <img src={awsLogo} alt="AWS" width={70} height={45} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
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
        <h2 className="text-xl font-bold">
          <span className="text-blue-500">ShiftHealth</span>
          <span className="text-red-500">+</span>
        </h2>
      </div>
    </div>
  );
};
