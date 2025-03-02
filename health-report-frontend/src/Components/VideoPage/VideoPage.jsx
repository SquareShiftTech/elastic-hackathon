import { useParams } from "react-router-dom";

export const VideoPage = () => {
  const { id } = useParams();

  return <div>Video Page</div>;
};
