import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { Pages } from "./Pages";
import { pages } from "../data/pages";

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={pages[0].path} />} />
      <Route path="/*" element={<Pages />} />
    </RouterRoutes>
  );
}

export { Routes };
