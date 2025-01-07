import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./NeedHelp.module.css";
import { sendNeedHelpEmail } from "../../service/api";
import { useAppSelector } from "../../hooks/auth";
import { selectToken } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

interface NeedHelpProps {
  closeModal: () => void;
  setIsLoading: (status: boolean) => void;
}

export interface NeedHelpData {
  email: string;
  comment: string;
}

const NeedHelpSchema = yup.object().shape({
  email: yup.string().email().required(),
  comment: yup.string().max(100).required(),
});

const NeedHelp: React.FC<NeedHelpProps> = ({ closeModal, setIsLoading }) => {
  const [sendingError, setSendingError] = useState<string | null>(null);
  const token = useAppSelector(selectToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NeedHelpData>({
    resolver: yupResolver(NeedHelpSchema),
    defaultValues: {
      email: "",
      comment: "",
    },
  });

  const onSubmit = async (data: NeedHelpData) => {
    try {
      setIsLoading(true);
      if (token) {
        await sendNeedHelpEmail(data, token).then(() => {
          setIsLoading(false);
          closeModal();
          toast.success("Success! Thank you!");
        });
      } else {
        throw new Error();
      }
    } catch {
      setIsLoading(false);
      setSendingError("Failed to send mail");
    }
  };

  return (
    <form
      className={styles.form}
      id="needHelpForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={styles.formInput}
        type="text"
        {...register("email")}
        placeholder="Email address"
      />
      {errors.email?.message && (
        <p className={styles.formError}>{errors.email?.message}</p>
      )}
      <textarea
        rows={4}
        className={styles.formComment}
        {...register("comment")}
        placeholder="Comment"
      ></textarea>
      {(errors.comment?.message || sendingError) && (
        <p className={styles.formError}>
          {sendingError || errors.comment?.message}
        </p>
      )}
    </form>
  );
};

export default NeedHelp;
