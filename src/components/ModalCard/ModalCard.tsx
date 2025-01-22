import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./ModalCard.module.css";
import { priorityColor } from "../../constants";
import clsx from "clsx";
import { Priority } from "../../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "../Icon/Icon";
import { useAppDispatch } from "../../hooks/auth";
import { addCard } from "../../redux/boards/operations";

type ModalCardType = "add" | "edit";

interface ModalCardProps {
  type: ModalCardType;
  closeModal: () => void;
  columnId: string;
}

interface AddCardType {
  title: string;
  description: string;
  priority: Priority;
  deadline: Date;
}

interface EditCardType {
  title?: string;
  description?: string;
  priority?: Priority;
  deadline?: Date;
}

type CardData = AddCardType | EditCardType;

const AddCardSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(2, "Description must be at least 2 characters")
    .max(300, "Description must be at most 300 characters"),

  priority: yup
    .mixed<Priority>()
    .oneOf(
      ["without priority", "low", "medium", "high"] as const,
      "Priority must be either low, medium, high or without priority"
    )
    .required("Priority is required"),

  deadline: yup
    .date()
    .required("Deadline is required")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(new Date(), "Deadline must be in the future")
    .typeError("Deadline must be a valid date"),
});

const EditCardSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),

  description: yup
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters")
    .max(300, "Description must be at most 300 characters"),

  priority: yup
    .mixed<Priority>()
    .oneOf(
      ["without priority", "low", "medium", "high"] as const,
      "Priority must be either low, medium, high or without priority"
    ),
  deadline: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(new Date(), "Deadline must be in the future")
    .typeError("Deadline must be a valid date"),
});

const ModalCard: React.FC<ModalCardProps> = ({
  type,
  closeModal,
  columnId,
}) => {
  const CardSchema = type === "add" ? AddCardSchema : EditCardSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CardData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "without priority",
      deadline: new Date(),
    },
    resolver: yupResolver(CardSchema),
  });

  const [selectedPriority, setSelectedPriority] =
    useState<Priority>("without priority");

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const datepickerRef = useRef<DatePicker>(null);

  const toggleCalendar = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(!datepickerRef.current.isCalendarOpen());
    }
  };

  const dispatch = useAppDispatch();
  const onSubmit = async (data: CardData) => {
    if (type === "add") {
      await dispatch(
        addCard({ ...(data as AddCardType), columnId: columnId })
      ).then(() => {
        closeModal();
      });
    }
  };

  return (
    <form
      id="addCardForm"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <div className={styles.wrap}>
        <input
          {...register("title")}
          placeholder="Title"
          className={styles.formInput}
        />
        {errors.title?.message && (
          <p className={styles.formError}>{errors.title.message}</p>
        )}
      </div>

      <div className={styles.wrap}>
        <textarea
          {...register("description")}
          placeholder="Description"
          rows={6}
          className={styles.formDescription}
        ></textarea>
        {errors.description?.message && (
          <p className={styles.formError}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.labelColorCont}>
        <p className={styles.formText}>Label color</p>
        <ul className={styles.list}>
          {Object.entries(priorityColor).map(([key, value]) => (
            <li
              className={clsx(styles["item"], {
                [styles.selectedItem]: selectedPriority === key,
              })}
              onClick={() => {
                setValue("priority", key as Priority, {
                  shouldValidate: true,
                });
                setSelectedPriority(key as Priority);
              }}
              key={key}
              style={{ backgroundColor: value }}
            ></li>
          ))}
        </ul>
        {errors.priority?.message && (
          <p className={styles.formError}>{errors.priority.message}</p>
        )}
      </div>

      <div className={styles.deadlineCont}>
        <p className={styles.formText}>Deadline</p>
        <div className={styles.datepickerCont}>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              if (date) {
                setValue("deadline", date, { shouldValidate: true });
                setStartDate(date);
              }
            }}
            className={styles.customDatePicker}
            dateFormat="MMMM d, yyyy"
            onKeyDown={(e) => e.preventDefault()}
          />
          <div className={styles.icon} onClick={toggleCalendar}>
            <Icon id="chevron-down" size={18} />
          </div>
        </div>
        {errors.deadline?.message && (
          <p className={styles.formError}>{errors.deadline.message}</p>
        )}
      </div>
    </form>
  );
};

export default ModalCard;
