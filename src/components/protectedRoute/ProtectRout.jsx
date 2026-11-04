//react
import { Navigate } from "react-router-dom";
//
import CircleLoadingDiv from "../sections/CircleLoadingDiv";
//
function ProtectRoute({ children, user, loading }) {
  if (loading) {
    return (
      <CircleLoadingDiv
        className="flex items-center justify-center fixed inset-0 z-50 bg-white"
        svgCalass="w-[150px] h-[150px]"
      />
    );
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectRoute;
