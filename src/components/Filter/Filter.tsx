import React, { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import { Icon } from "../Icon/Icon";
import ReactModal from "react-modal";
import { priorityColor } from "../../constants";
import { Priority } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/auth";
import { getBoards } from "../../redux/boards/operations";
import { saveToLocalStorage } from "../../service/localStorage";
import { selectUser } from "../../redux/auth/selectors";

interface FilterProps {
  title: string | undefined;
}

const Filter: React.FC<FilterProps> = ({ title }) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<
    Priority | "show all" | null
  >(null);

  const handleSelectFilter = (option: Priority | "show all") => {
    saveToLocalStorage("filter", option);
    setSelectedFilter(option);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    const filterBoard = async (priority: Priority | "show all") => {
      if (priority !== "show all") {
        await dispatch(
          getBoards({
            priority: priority,
          })
        ).then(() => {
          setIsFilterOpen(false);
        });
      } else {
        await dispatch(getBoards()).then(() => {
          setIsFilterOpen(false);
        });
      }
    };

    if (selectedFilter !== null) {
      filterBoard(selectedFilter);
    }
  }, [selectedFilter]);

  const user = useAppSelector(selectUser);
  const backgroundColor = user.theme === "dark" ? "#151515" : "#FCFCFC";
  const color = user.theme === "dark" ? "#FCFCFC" : "#151515";

  return (
    <div>
      <div className={styles.filterSection}>
        <p className={styles.boardName}>{title}</p>
        <div
          className={styles.filterCont}
          onClick={() => setIsFilterOpen(true)}
        >
          <Icon id="filter" size={16} />
          <p className={styles.filterText}>Filters</p>
        </div>
      </div>

      <ReactModal
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        isOpen={isFilterOpen}
        onRequestClose={() => setIsFilterOpen(false)}
        style={{
          content: {
            overflowY: "auto",
            position: "relative",
            backgroundColor: backgroundColor,
            maxWidth: "300px",
            maxHeight: "234px",
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
          <p className={styles.modalTitle}>Filters</p>
          <div
            onClick={() => setIsFilterOpen(false)}
            className={styles.closeBtn}
          >
            <Icon
              size={18}
              id={user.theme === "dark" ? "x-close" : "x-close-black"}
            />
          </div>
        </div>
        <div className={styles.filterOptions}>
          <div className={styles.labelCont}>
            <p className={styles.labelText}>Label color</p>
            <button
              onClick={() => handleSelectFilter("show all")}
              className={styles.showAllBtn}
            >
              Show all
            </button>
          </div>
          <ul className={styles.list}>
            {Object.entries(priorityColor).map(([key, value]) => (
              <li
                className={styles.item}
                key={key}
                onClick={() => handleSelectFilter(key as Priority)}
              >
                <div
                  className={styles.color}
                  style={{ backgroundColor: value }}
                ></div>
                <p className={styles.option}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ReactModal>
    </div>
  );
};

export default Filter;
