import React from "react";
import ReactModal from "react-modal";
import { Icon } from "../Icon/Icon";
import styles from "./ModalWindow.module.css";
import Loader from "../Loader/Loader";

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
  return (
    <ReactModal
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          overflowY: "auto",
          position: "relative",
          backgroundColor: "var(--modal-background-color)",
          maxWidth: width || "400px",
          maxHeight: height || "0px",
          width: "100%",
          height: "100%",
          border: "none",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
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
          <Icon size={18} id="x-close" />
        </div>
      </div>
      {children}
      {submitBtnChildren &&
        (isLoading ? (
          <div className={styles.loaderCont}>
            <Loader />
          </div>
        ) : (
          <button type="submit" form={formId} className={styles.submitBtn}>
            {submitBtnChildren}
          </button>
        ))}
    </ReactModal>
  );
};

export default ModalWindow;
