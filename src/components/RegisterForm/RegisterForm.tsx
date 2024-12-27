import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerFormData } from "../../types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./RegisterForm.module.css";
import { Icon } from "../Icon/Icon";

const registerSchema = yup.object().shape({
  name: yup.string().min(2).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(7).max(14).required(),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>({
    resolver: yupResolver(registerSchema),
  });

  const [passwordState, setPasswordState] = useState<"text" | "password">(
    "password"
  );

  const togglePasswordState = () => {
    setPasswordState((prev) => {
      return prev === "password" ? "text" : "password";
    });
  };

  const onSubmit = (data: registerFormData) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formWrapCont}>
        <input
          className={styles.formInput}
          placeholder="Enter your name"
          {...register("name")}
        />
        <p className={styles.formError}>{errors?.name?.message}</p>
        <input
          className={styles.formInput}
          placeholder="Enter your email"
          {...register("email")}
        />
        <p className={styles.formError}>{errors?.email?.message}</p>
        <div className={styles.passwordWrap}>
          <input
            type={passwordState}
            className={styles.formInput}
            placeholder="Create a password"
            {...register("password")}
          />
          <div onClick={togglePasswordState} className={styles.eye}>
            <Icon id="eye" size={18} />
          </div>
        </div>
        <p className={styles.formError}> {errors?.password?.message}</p>
      </div>
      <button className={styles.submitBtn} type="submit">
        Register Now
      </button>
    </form>
  );
};

export default RegisterForm;
