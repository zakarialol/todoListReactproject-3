import { useLocation } from "react-router-dom";
function RouteDebugger() {
  const location = useLocation();

  return (
    <div className="fixed top-20 left-0 z-[99999] bg-blue-700 p-3 text-white">
      <p>React Router: {location.pathname}</p>
      <p>Browser URL: {window.location.pathname}</p>
    </div>
  );
}
export default RouteDebugger;
