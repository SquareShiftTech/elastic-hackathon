import React from "react";
import { HealthReportUpload } from "../HealthReportUpload/HealthReportUpload";
export const HomePage = () => {
  return (
    <div
      style={{
        textAlign: "center"
      }}>
      <h1>Health Report Upload</h1>
      <div>
        <HealthReportUpload />
      </div>
    </div>
  );
};
