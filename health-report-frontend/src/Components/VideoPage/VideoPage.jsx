import { useNavigate, useParams } from "react-router-dom";

import "./videoPage.css";
import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../../apis/fetchData";
import video1 from "../../assets/video1.mp4";

// import unhealthy from "../../assets/unhealthy.webp";
// import healthy from "../../assets/healthy.webp";

export const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const reportInfo = localStorage.getItem("reportInfo");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState();

  const fetchVideoUrl = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);
      const data = await fetchData({
        url: `${process.env.REACT_APP_BACKEND_DOMAIN}/create_video`,
        body: JSON.parse(reportInfo)?.data
      });
      setData(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  }, [reportInfo]);

  useEffect(() => {
    if (id) {
      fetchVideoUrl();
    }
  }, [fetchVideoUrl, id]);

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "26px"
        }}>
        Loading....
      </div>
    );
  }

  return (
    <div className="videoPage">
      {error ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "26px",
            color: "red"
          }}>
          Something went wrong on video creation, please goto dashboard
        </div>
      ) : (
        <div className="video-container">
          <div
            className="video-div"
            style={{
              margin: "auto"
            }}>
            <video controls width="100%" height="375px">
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}>
        <button
          style={{
            width: "200px"
          }}
          className="button button-primary"
          onClick={() => {
            navigate(`/dashboard/${id}`);
          }}>
          Go to dashboard
        </button>
      </div>
    </div>
  );
};
