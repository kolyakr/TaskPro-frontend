import React, { useState } from "react";
import { Icon } from "../Icon/Icon";
import smilingTree1x from "../../assets/images/smiling_tree-1x.png";
import smilingTree2x from "../../assets/images/smiling_tree-2x.png";
import BoardsList from "../BoardsList/BoardsList";
import styles from "./Sidebar.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/auth";
import { logoutUser } from "../../redux/auth/operations";
import NeedHelp from "../NeedHelp/NeedHelp";
import ModalWindow from "../ModalWindow/ModalWindow";
import CreateBoard from "../CreateBoard/CreateBoard";
import { selectBoards, selectIsLoading } from "../../redux/boards/selectors";

type ModalType = "need-help" | "create";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const boards = useAppSelector(selectBoards);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  const closeModal = () => {
    if (isHelpModalOpen) {
      setIsHelpModalOpen(false);
    }
    if (isCreateModalOpen) {
      setIsCreateModalOpen(false);
    }
  };

  const openModal = (modalName: ModalType) => {
    if (modalName === "need-help") {
      setIsHelpModalOpen(true);
    }
    if (modalName === "create") {
      setIsCreateModalOpen(true);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoCont}>
        <Icon id="logo" size={32} />
        <p className={styles.logoName}>Task Pro</p>
      </div>
      <div className={styles.wrapCont}>
        <div>
          <p className={styles.boardsTitle}>My boards</p>
          <div
            className={styles.createBoardCont}
            onClick={() => openModal("create")}
          >
            <p className={styles.createBoardText}>Create a new board</p>
            <Icon id="add" size={36} />
          </div>
        </div>
        {boards && boards.length > 0 && <BoardsList />}
        <div>
          <div className={styles.needHelpCont}>
            <img
              src={smilingTree1x}
              srcSet={`${smilingTree1x} 1x, ${smilingTree2x} 2x`}
              alt="Smiling tree"
              className={styles.smilingTreeImg}
            />
            <div className={styles.needHelpDescr}>
              If you need help with{" "}
              <span className={styles.needhelpDescrSpan}>TaskPro</span>, check
              out our support resources or reach out to our customer support
              team.
            </div>
            <div
              className={styles.needHelpIconCont}
              onClick={() => openModal("need-help")}
            >
              <Icon id="help-circle" size={20} />
              <p className={styles.needHelpText}>Need help?</p>
            </div>
          </div>
          <div className={styles.logoutCont} onClick={handleLogout}>
            <Icon id="login" size={32} />
            <p className={styles.logoutText}>Log out</p>
          </div>
        </div>
      </div>

      <ModalWindow
        isOpen={isHelpModalOpen}
        closeModal={closeModal}
        formId="needHelpForm"
        width="400px"
        height="400px"
        title="Need help"
        submitBtnChildren={<p>Send</p>}
        isLoading={isModalLoading}
      >
        <NeedHelp closeModal={closeModal} setIsLoading={setIsModalLoading} />
      </ModalWindow>

      <ModalWindow
        isOpen={isCreateModalOpen}
        closeModal={closeModal}
        formId="createBoardForm"
        width="350px"
        height="433px"
        title="New board"
        submitBtnChildren={
          <div className={styles.modalBtn}>
            <Icon className={styles.addIcon} id="modal-plus" size={28} />
            <p>Create</p>
          </div>
        }
        isLoading={isLoading}
      >
        <CreateBoard closeModal={closeModal} />
      </ModalWindow>
    </aside>
  );
};

export default Sidebar;
