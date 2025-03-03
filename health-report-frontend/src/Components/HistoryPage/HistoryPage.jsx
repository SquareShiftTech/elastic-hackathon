import React, { useCallback, useEffect, useState } from "react";
import { fetchData } from "../../apis/fetchData";
import { Skeleton } from "@mui/material";
import "./HistoryPage.css";

export const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userName = localStorage.getItem("userName");

  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetchData({
        url: `${process.env.REACT_APP_BACKEND_DOMAIN}/list_files`,
        body: { user_id: userName }
      });
      setData(response?.files || []);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  }, [userName]);

  useEffect(() => {
    if (userName) {
      fetchHistory();
    }
  }, [fetchHistory, userName]);

  const getDataTime = (data) => {
    const date = new Date(data);
    // Format date
    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);

    // Format time
    const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return (
      <div>
        <div>{formattedDate}</div>
        <div
          style={{
            fontSize: "12px",
            color: "gray"
          }}>
          {formattedTime}
        </div>
      </div>
    );
  };

  return (
    <div className="history-container">
      <h2 className="title">List of Records</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Uploaded At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton height={20} width="100%" />
                  </td>
                  <td>
                    <Skeleton height={20} width="100%" />
                  </td>
                  <td>
                    <Skeleton circle height={30} width={30} />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={3} className="no-data">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((file, index) => (
                <tr key={index}>
                  <td>{file.file_name}</td>
                  <td>{getDataTime(file.uploaded_at)}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => {
                        window.open(file.file_url, "_blank");
                      }}>
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
