import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import styles from "./App.module.css";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useAppDispatch, useAppSelector } from "./hooks/auth";
import { selectToken, selectUser } from "./redux/auth/selectors";
import { getUser } from "./redux/auth/operations";
import RefreshPage from "./components/RefreshPage/RefreshPage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        setIsRefreshing(true);
        await dispatch(getUser(token));
      }
      setIsRefreshing(false);
    };

    getUserData();
  }, [dispatch, token]);

  if (isRefreshing) {
    return <RefreshPage />;
  }

  return (
    <div data-theme={user.theme} className={styles.app}>
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
        <Route
          path="/welcome"
          element={
            <RestrictedRoute>
              <WelcomePage />
            </RestrictedRoute>
          }
        />
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
