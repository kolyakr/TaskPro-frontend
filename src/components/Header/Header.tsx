import React from "react";
import { Icon } from "../Icon/Icon";
import defaultAvatar from "../../assets/images/user.png";
import styles from "./Header.module.css";
import { useAppSelector } from "../../hooks/auth";
import { selectUser } from "../../redux/auth/selectors";

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className={styles.header}>
      <div className={styles.headerCont}>
        <div className={styles.themeCont}>
          <p className={styles.themeText}>Theme</p>
          <Icon id="chevron-down" size={16} />
        </div>
        <div className={styles.nameCont}>
          <p className={styles.nameText}>{user.name}</p>
          <div className={styles.avatarCont}>
            <img
              className={styles.avatar}
              src={defaultAvatar}
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
