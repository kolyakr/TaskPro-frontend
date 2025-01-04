import { forwardRef } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  options: string[];
  isDropdownOpen: boolean;
  handleOption: (option: string) => void;
  className?: string;
}

const Dropdown = forwardRef<HTMLUListElement, DropdownProps>(
  ({ options, handleOption, isDropdownOpen, className }, ref) => {
    return (
      <>
        {isDropdownOpen && (
          <ul ref={ref} className={className}>
            {options.map((option) => (
              <li
                className={styles.option}
                key={option}
                onClick={() => handleOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
);

export default Dropdown;
