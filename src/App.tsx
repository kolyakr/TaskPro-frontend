import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import styles from "./App.module.css";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App: React.FC = () => {
  return (
    <div data-theme="light" className={styles.app}>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth/:id"
          element={
            <RestrictedRoute>
              <AuthPage />
            </RestrictedRoute>
          }
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/home/:boardName"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
