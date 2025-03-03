import React from "react";
import companyLogo from "../../assets/squareshift2.png";
import elasticLogo from "../../assets/elastic.png";
import awsLogo from "../../assets/aws.png";

const PoweredByFooter = () => {
  return (
    <div className="footer-logo">
      <h4 className="logo-label">Powered By</h4>
      <div className="logos">
        <img src={elasticLogo} alt="Elastic" width={100} height={45} />
        <img src={awsLogo} alt="AWS" width={70} height={45} />
        <img src={companyLogo} alt="SquareShift" width={140} height={45} />
      </div>
    </div>
  );
};

export default PoweredByFooter;
