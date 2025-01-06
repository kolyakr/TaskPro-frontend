import React, { useState } from "react";
import { Icon } from "../Icon/Icon";
import smilingTree1x from "../../assets/images/smiling_tree-1x.png";
import smilingTree2x from "../../assets/images/smiling_tree-2x.png";
// import BoardsList from "../BoardsList/BoardsList";
import styles from "./Sidebar.module.css";
import { useAppDispatch } from "../../hooks/auth";
import { logoutUser } from "../../redux/auth/operations";
import NeedHelp from "../NeedHelp/NeedHelp";
import ModalWindow from "../ModalWindow/ModalWindow";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
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
          <div className={styles.createBoardCont}>
            <p className={styles.createBoardText}>Create a new board</p>
            <Icon id="add" size={36} />
          </div>
        </div>
        {/* <BoardsList /> */}
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
            <div className={styles.needHelpIconCont} onClick={openModal}>
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
        isOpen={isModalOpen}
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
    </aside>
  );
};

export default Sidebar;
