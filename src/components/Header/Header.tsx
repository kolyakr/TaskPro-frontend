import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Header.module.css";
import { useAppDispatch } from "../../hooks/auth";
import Dropdown from "../Dropdown/Dropdown";
import { updateUserProfile } from "../../redux/auth/operations";
import UserInfo from "../UserInfo/UserInfo";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const themeDropdownRef = useRef<HTMLUListElement | null>(null);
  const themeButtonRef = useRef<HTMLDivElement | null>(null);

  const handleThemeState = () => {
    setIsThemeOpen((prev) => !prev);
  };

  const handleThemeOption = async (theme: string) => {
    theme = theme.toLowerCase();

    await dispatch(
      updateUserProfile({
        theme,
      })
    );

    setIsThemeOpen(false);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      themeDropdownRef.current &&
      !themeDropdownRef.current.contains(e.target as Node) &&
      themeButtonRef.current &&
      !themeButtonRef.current.contains(e.target as Node)
    ) {
      setIsThemeOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isThemeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isThemeOpen, handleClickOutside]);

  return (
    <header className={styles.header}>
      {isThemeOpen && (
        <Dropdown
          ref={themeDropdownRef}
          className={styles.themeDropdown}
          isDropdownOpen={isThemeOpen}
          options={["Light", "Dark", "Violet"]}
          handleOption={handleThemeOption}
        />
      )}
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
