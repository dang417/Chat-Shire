import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage";
import ProfilePage from "./pages/ProfilePage";
import CustomProfilePage from "./pages/CustomProfilePage";
import IdeaPage from "./pages/IdeaPage";
import MessagePage from "./pages/MessagePage";
import TaskPage from "./pages/TaskPage";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Login = lazy(() => import("./pages/LoginPage"));
const Main = lazy(() => import("./pages/MainPage"));
const CreatePjt = lazy(() => import("./pages/CreateProjectPage"));
const Redirect = lazy(() => import("./pages/RedirectPage"));

function AppRouter() {
  return (
    <div className="AppRouter">
      <BrowserRouter>
        <Suspense
          fallback={
            <>
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            </>
          }
        >
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/createpjt" element={<CreatePjt />}></Route>

            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route
              path="/profile/custom"
              element={<CustomProfilePage />}
            ></Route>

            <Route
              path="/analysis/:projectId"
              element={<AnalysisPage />}
            ></Route>
            <Route path="/idea/:projectId" element={<IdeaPage />}></Route>
            <Route path="/message/:projectId" element={<MessagePage />}></Route>
            <Route path="/task/:projectId" element={<TaskPage />}></Route>
            <Route path="/oauth2/sign-up" element={<Redirect />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
