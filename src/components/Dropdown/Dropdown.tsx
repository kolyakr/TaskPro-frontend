import { forwardRef, useEffect, useCallback, useRef } from "react";
import styles from "./Dropdown.module.css";

export type Option = {
  value: string;
  label?: React.ReactNode;
  id?: string;
};

interface DropdownProps {
  options: Option[];
  isDropdownOpen: boolean;
  handleOption: (option: string) => void;
  onClose: () => void;
  className?: string;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ options, handleOption, isDropdownOpen, onClose, className }, ref) => {
    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const handleClickOutside = useCallback(
      (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          (ref as React.RefObject<HTMLDivElement>)?.current &&
          !(ref as React.RefObject<HTMLDivElement>)?.current?.contains(
            e.target as Node
          )
        ) {
          onClose();
        }
      },
      [onClose, ref]
    );

    useEffect(() => {
      if (isDropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isDropdownOpen, handleClickOutside]);

    return (
      <>
        {isDropdownOpen && (
          <ul ref={dropdownRef} className={className}>
            {options.map((option) => (
              <li
                className={styles.option}
                key={option?.id ?? option.value}
                onClick={() => handleOption(option?.id ?? option.value)}
              >
                <p>{option.value}</p>
                {option.label && (
                  <div className={styles.iconWrap}>{option.label}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
);

export default Dropdown;
