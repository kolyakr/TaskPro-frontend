import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import styles from "./App.module.css";

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
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/home/:boardName"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
