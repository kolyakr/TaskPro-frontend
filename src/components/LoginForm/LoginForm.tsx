import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginFormData } from "../../types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./LoginForm.module.css";
import { Icon } from "../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../hooks/auth";
import { selectError, selectIsLoggedIn } from "../../redux/auth/selectors";
import { loginUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(7).max(14).required(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [passwordState, setPasswordState] = useState<"text" | "password">(
    "password"
  );

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectError);
  const navigate = useNavigate();

  const togglePasswordState = () => {
    setPasswordState((prev: "text" | "password") => {
      return prev === "text" ? "password" : "text";
    });
  };

  const onSubmit = async (data: loginFormData) => {
    await dispatch(loginUser(data));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="false"
    >
      <input
        className={styles.formInput}
        placeholder="Enter your email"
        {...register("email")}
      />
      <p className={errors?.email ? styles.formError : styles.noFormError}>
        {errors?.email?.message}
      </p>
      <div className={styles.passwordWrap}>
        <input
          type={passwordState}
          className={styles.formInput}
          placeholder="Confirm a password"
          {...register("password")}
        />
        <div onClick={togglePasswordState} className={styles.eye}>
          <Icon id="eye" size={18} />
        </div>
      </div>
      <p
        className={
          errors?.email || authError ? styles.formError : styles.noFormError
        }
      >
        {errors?.password?.message ?? authError}
      </p>
      <button className={styles.submitBtn} type="submit">
        Log in now
      </button>
    </form>
  );
};

export default LoginForm;
