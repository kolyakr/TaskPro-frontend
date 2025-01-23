import React, { useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Header.module.css";
import { useAppDispatch } from "../../hooks/auth";
import { updateUserProfile } from "../../redux/auth/operations";
import UserInfo from "../UserInfo/UserInfo";
import Dropdown from "../Dropdown/Dropdown";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const themeButtonRef = useRef<HTMLDivElement | null>(null);

  const handleThemeState = () => {
    setIsThemeOpen((prev) => !prev);
  };

  const handleThemeOption = async (theme: string) => {
    const formData = new FormData();
    formData.append("theme", theme.toLowerCase());
    await dispatch(updateUserProfile(formData));
    setIsThemeOpen(false);
  };

  return (
    <header className={styles.header}>
      <Dropdown
        ref={themeButtonRef}
        className={styles.themeDropdown}
        isDropdownOpen={isThemeOpen}
        options={[{ value: "Light" }, { value: "Dark" }, { value: "Violet" }]}
        handleOption={handleThemeOption}
        onClose={() => setIsThemeOpen(false)}
      />
      <div className={styles.headerCont}>
        <div
          ref={themeButtonRef}
          onClick={handleThemeState}
          className={styles.themeCont}
        >
          <p className={styles.themeText}>Theme</p>
          <Icon id="chevron-down" size={16} />
        </div>
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
