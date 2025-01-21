import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Column } from "../../types/columns";
import { yupResolver } from "@hookform/resolvers/yup";
import { addColumn, editColumn } from "../../redux/boards/operations";
import { useAppDispatch } from "../../hooks/auth";
import styles from "./ModalColumn.module.css";

const ModalColumnSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Minimum length is 2 symbols")
    .max(20, "Maximum length is 20 symbols")
    .required(),
});

type ModalColumnType = "add" | "edit";

interface ModalColumnProps {
  type: ModalColumnType;
  boardId: string | null;
  column?: Column;
  closeModal: () => void;
}

const ModalColumn: React.FC<ModalColumnProps> = ({
  type,
  boardId,
  column,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<Column, "title">>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(ModalColumnSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: Pick<Column, "title">) => {
    if (type === "add") {
      await dispatch(
        addColumn({ boardId: boardId || "", title: data.title })
      ).then(() => {
        closeModal();
      });
    }

    if (type === "edit" && column?.columnId != null) {
      await dispatch(
        editColumn({
          boardId: boardId || "",
          title: data.title,
          columnId: column.columnId,
        })
      ).then(() => {
        closeModal();
      });
    }
  };

  return (
    <form
      className={styles.form}
      id={type === "add" ? "addColumnForm" : "editColumnForm"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={styles.formInput}
        type="text"
        {...register("title")}
        placeholder={column?.title || "Title"}
      />
      {errors.title?.message && (
        <p className={styles.formError}>{errors.title.message}</p>
      )}
    </form>
  );
};

export default ModalColumn;
