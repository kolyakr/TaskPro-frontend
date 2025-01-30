import React from "react";
import ReactModal from "react-modal";
import { Icon } from "../Icon/Icon";
import styles from "./ModalWindow.module.css";
import Loader from "../Loader/Loader";
import { useAppSelector } from "../../hooks/auth";
import { selectUser } from "../../redux/auth/selectors";

interface ModalWindowProps {
  isOpen: boolean;
  children?: React.ReactNode;
  height?: string;
  width?: string;
  title?: string;
  submitBtnChildren?: React.ReactNode;
  closeModal: () => void;
  isLoading?: boolean;
  formId: string;
}

ReactModal.setAppElement("#root");

const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpen,
  children,
  height,
  width,
  title,
  submitBtnChildren,
  closeModal,
  isLoading,
  formId,
}) => {
  const user = useAppSelector(selectUser);
  const backgroundColor = user.theme === "dark" ? "#151515" : "#FCFCFC";
  const color = user.theme === "dark" ? "#FCFCFC" : "#151515";
  const submitBackgroundColor = user.theme === "violet" ? "#5255BC" : "#bedbb0";
  const submitColor = user.theme === "violet" ? "#FFFFFF" : "#161616";

  return (
    <ReactModal
      key={user.theme}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          overflowY: "auto",
          position: "relative",
          backgroundColor: backgroundColor,
          maxWidth: width || "400px",
          maxHeight: height || "0px",
          width: "100%",
          height: "100%",
          border: "none",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          color: color,
        },
        overlay: {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        },
      }}
    >
      <div className={styles.modalHeader}>
        <p className={styles.modalTitle}>{title}</p>
        <div onClick={closeModal} className={styles.closeBtn}>
          <Icon
            key={user.theme}
            size={18}
            id={user.theme === "dark" ? "x-close" : "x-close-black"}
          />
        </div>
      </div>
      {children}
      {submitBtnChildren &&
        (isLoading ? (
          <div className={styles.loaderCont}>
            <Loader />
          </div>
        ) : (
          <button
            key={user.theme}
            type="submit"
            form={formId}
            className={styles.submitBtn}
            style={{
              backgroundColor: submitBackgroundColor,
              color: submitColor,
            }}
          >
            {submitBtnChildren}
          </button>
        ))}
    </ReactModal>
  );
};

export default ModalWindow;
