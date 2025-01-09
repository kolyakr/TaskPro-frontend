import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Icon } from "../Icon/Icon";
import { backgroundImages, icons } from "../../constants";
import clsx from "clsx";
import { CreateBoardData, EditBoardData } from "../../types/boards";
import { useAppDispatch } from "../../hooks/auth";
import { createBoard, editBoard } from "../../redux/boards/operations";
import styles from "./ModalBoard.module.css";

const CreateBoardSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Minimum length is 2 characters")
    .max(20, "Maximum length is 20 characters")
    .required("Title is required"),
  icon: yup.string().min(1, "Icon is required").required("Icon is required"),
  background: yup
    .string()
    .min(1, "Background is required")
    .required("Background is required"),
});

const EditBoardSchema = yup.object().shape({
  title: yup
    .string()
    .test(
      "is-empty-or-valid",
      "Minimum length is 2 characters",
      (value) =>
        value === "" ||
        (value != undefined && value?.length >= 2 && value?.length <= 20)
    )
    .max(20, "Maximum length is 20 characters"),
  icon: yup.string(),
  background: yup.string(),
});

type ModalBoardType = "create" | "edit";

interface ModalBoardProps {
  closeModal: () => void;
  type: ModalBoardType;
  boardId?: string;
}

const ModalBoard: React.FC<ModalBoardProps> = ({
  closeModal,
  type,
  boardId,
}) => {
  const ModalBoardSchema =
    type === "create" ? CreateBoardSchema : EditBoardSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateBoardData | Omit<EditBoardData, "boardId">>({
    resolver: yupResolver(ModalBoardSchema),
    defaultValues: {
      title: "",
      icon: "",
      background: "",
    },
  });

  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedBackground, setSelectedBackground] = useState<string>("");

  const handleIcon = (icon: string) => {
    if (icon === selectedIcon) {
      setSelectedIcon("");
      setValue("icon", "", { shouldValidate: true });
    } else {
      setSelectedIcon(icon);
      setValue("icon", icon, { shouldValidate: true });
    }
  };

  const handleBackground = (background: string) => {
    if (background === selectedBackground) {
      setSelectedBackground("");
      setValue("background", "", { shouldValidate: true });
    } else {
      setSelectedBackground(background);
      setValue("background", background, { shouldValidate: true });
    }
  };

  const dispatch = useAppDispatch();

  const onSubmit = async (
    data: CreateBoardData | Omit<EditBoardData, "boardId">
  ) => {
    if (type === "create") {
      const createBoardData: CreateBoardData = {
        title: data.title,
        icon: data.icon,
        background: data.background,
      };
      await dispatch(createBoard(createBoardData)).then(() => {
        closeModal();
      });
    }

    if (type === "edit") {
      const editBoardData: EditBoardData = {
        boardId: null,
      };

      if (data?.title && data.title !== "") {
        editBoardData.title = data.title;
      }
      if (data?.background && data.background != "") {
        editBoardData.background = data.background;
      }
      if (data?.icon && data.icon !== "") {
        editBoardData.icon = data.icon;
      }

      editBoardData.boardId = boardId || null;

      if (Object.keys(editBoardData).length > 1) {
        await dispatch(editBoard(editBoardData)).then(() => {
          closeModal();
        });
      }
    }
  };

  return (
    <form
      id={type === "create" ? "createBoardForm" : "editBoardForm"}
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.titleCont}>
        <input
          className={styles.formInput}
          type="text"
          {...register("title")}
          placeholder="Title"
        />
        {errors.title?.message && (
          <p className={styles.formError}>{errors.title?.message}</p>
        )}
      </div>
      <div className={styles.iconsCont}>
        <p className={styles.formText}>Icons</p>
        <ul className={styles.iconsList}>
          {icons.map((icon: string) => (
            <li
              onClick={() => handleIcon(icon)}
              className={clsx({ [styles.selectedIcon]: icon === selectedIcon })}
              key={icon}
              id={icon}
            >
              <Icon className={styles.icon} id={icon} size={18} />
            </li>
          ))}
        </ul>
        {errors.icon?.message && (
          <p className={styles.formError}>{errors.icon?.message}</p>
        )}
      </div>
      <div className={styles.backgroundImgCont}>
        <p className={styles.formText}>Background</p>
        <ul className={styles.backgroundImgList}>
          {backgroundImages.map((background) => (
            <li
              onClick={() => handleBackground(background)}
              key={background}
              id={background}
              className={clsx({
                [styles.selectedBackground]: background === selectedBackground,
              })}
            >
              <img
                className={styles.backgroundImg}
                src={background}
                srcSet={`${background} 1x, ${background} 2x`}
                alt={background}
              />
            </li>
          ))}
        </ul>
        {errors.background?.message && (
          <p className={styles.formError}>{errors.background?.message}</p>
        )}
      </div>
    </form>
  );
};

export default ModalBoard;
