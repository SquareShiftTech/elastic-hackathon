import { useNavigate, useParams } from "react-router-dom";

import "./videoPage.css";
import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../../apis/fetchData";

export const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState();

  const fetchVideoUrl = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);
      const data = await fetchData({
        url: `${process.env.REACT_APP_UPLOAD_PDF}/getVideo/${id}`
      });
      setData(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchVideoUrl();
    }
  }, [fetchVideoUrl, id]);

  return (
    <div>
      <div className="video-container">
        <div className="video-div">
          <h3>Current one </h3>
          <video controls width="100%">
            <source
              src={
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-div">
          <h3>Improved one </h3>
          <video controls width="100%">
            <source
              src={
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div
        style={{
          textAlign: "center"
        }}>
        <button
          onClick={() => {
            navigate(`/dashboard/${id}`);
          }}>
          Go to dashboard
        </button>
      </div>
    </div>
  );
};
