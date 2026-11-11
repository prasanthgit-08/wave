import { useNavigate } from "react-router-dom";
import { getPreviousRoute } from "../utils/routeHistory";

export const useAppNavigate = () => {
  const navigate = useNavigate();

  const goBack = (fallback = "/") => {
    const previousUrl = getPreviousRoute();
    navigate(previousUrl || fallback, { replace: true });
  };

  return { goBack };
};
