import React from "react";
import { Icon } from "../Icon/Icon";
import smilingTree1x from "../../assets/images/smiling_tree-1x.png";
import smilingTree2x from "../../assets/images/smiling_tree-2x.png";
// import BoardsList from "../BoardsList/BoardsList";
import styles from "./Sidebar.module.css";
import { useAppDispatch } from "../../hooks/auth";
import { logoutUser } from "../../redux/auth/operations";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
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
            <div className={styles.needHelpIconCont}>
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
    </aside>
  );
};

export default Sidebar;
