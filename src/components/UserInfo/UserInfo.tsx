import React, { useEffect, useState } from "react";
import styles from "./UserInfo.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useAppDispatch, useAppSelector } from "../../hooks/auth";
import { selectIsLoading, selectUser } from "../../redux/auth/selectors";
import defaultAvatar from "../../assets/images/user.png";
import { Icon } from "../Icon/Icon";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "../../redux/auth/operations";

interface EditProfileType {
  name?: string | null;
  email?: string | null;
  avatar?: File | null;
}

const editProfileValidation = yup.object({
  name: yup
    .string()
    .test(
      "empty-or-valid",
      "Name is too short",
      (value) =>
        value === "" ||
        (value !== null && value !== undefined && value.length >= 2)
    )
    .max(20, "Name is too long")
    .nullable(),
  email: yup.string().email("Invalid email format").nullable().notRequired(),
  avatar: yup
    .mixed<File>()
    .nullable()
    .test(
      "fileType",
      "Uploaded file must be an image (jpg, png, gif, or webp)",
      (value) =>
        value === null ||
        (value instanceof File &&
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            value.type
          ))
    )
    .test(
      "fileSize",
      "File size must be less than 2MB",
      (value) =>
        value === null ||
        (value instanceof File && value.size <= 2 * 1024 * 1024)
    ),
});

const UserInfo: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EditProfileType>({
    defaultValues: {
      name: "",
      email: "",
      avatar: null,
    },
    resolver: yupResolver(editProfileValidation),
  });

  const watchAvatar = watch("avatar");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  const onSubmit = async (data: EditProfileType) => {
    const formData = new FormData();

    if (data.name && data.name !== "") {
      formData.append("name", data.name);
    }
    if (data.email && data.email !== "") {
      formData.append("email", data.email);
    }
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    if ([...formData].length > 0) {
      await dispatch(updateUserProfile(formData)).then(() => {
        setIsModalOpen(false);
        reset();
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (watchAvatar instanceof File) {
      const objectUrl = URL.createObjectURL(watchAvatar);
      setTempImageSrc(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
        setTempImageSrc(null);
      };
    }
  }, [watchAvatar]);

  return (
    <>
      <div onClick={openModal} className={styles.nameCont}>
        <p className={styles.nameText}>{user.name}</p>
        <div className={styles.avatarCont}>
          <img
            className={styles.avatar}
            src={user.avatar || defaultAvatar}
            alt="User avatar"
          />
        </div>
      </div>

      <ModalWindow
        closeModal={closeModal}
        isOpen={isModalOpen}
        width="400px"
        height="440px"
        title="Edit profile"
        submitBtnChildren={<p>Send</p>}
        isLoading={isLoading}
        formId="editProfileForm"
      >
        <form id="editProfileForm" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.modalAvatarCont}>
            <img
              className={styles.modalAvatar}
              src={tempImageSrc || user.avatar || defaultAvatar}
              alt="avatar"
            />
            <label htmlFor="photoInput" className={styles.addIcon}>
              <Icon
                id="add"
                size={24}
                fill="var(--sidebar-add-btn-fill)"
                stroke="var(--sidebar-add-btn-stroke)"
              />
            </label>
          </div>
          <input
            className={styles.photoInput}
            type="file"
            id="photoInput"
            accept="image/*"
            onChange={(e) => {
              if (e.target?.files) {
                const file = e.target?.files[0] || null;
                setValue("avatar", file, { shouldValidate: true });
              }
            }}
          />
          <p className={styles.formError}>{errors.avatar?.message}</p>
          <div className={styles.inputCont}>
            <input
              className={styles.modaInput}
              type="text"
              placeholder={user.name || ""}
              {...register("name")}
            />
            <p className={styles.formError}>{errors.name?.message}</p>

            <input
              className={styles.modaInput}
              type="text"
              placeholder={user.email || ""}
              {...register("email")}
            />
            <p className={styles.formError}>{errors.email?.message}</p>
          </div>
        </form>
      </ModalWindow>
    </>
  );
};

export default UserInfo;
