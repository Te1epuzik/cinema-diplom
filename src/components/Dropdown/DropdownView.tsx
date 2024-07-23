import { ReactNode } from "react";
import classes from "./dropdown.module.scss";

import { CircleMobileSVG, CircleSVG } from "@/svg";
import ArrowDownPNG from "@/assets/arrowdown.png";

type TProps = {
  content: ReactNode | string;
  children: ReactNode;
  isActive: boolean;
  handleToggleDropDown: () => void;
  isMobile: boolean;
  position: "first" | "midle" | "last";
};

export const DropdownView = ({
  content,
  children,
  isActive,
  handleToggleDropDown,
  isMobile,
  position,
}: TProps) => {
  return (
    <div className={classes["dropdown-wrapper"]}>
      <button className={classes["dropdown"]} onClick={handleToggleDropDown}>
        <header
          className={classes["header"] + " " + classes["header-" + position]}
        >
          <div className={classes["circle"]}>
            {isMobile ? <CircleMobileSVG /> : <CircleSVG />}
          </div>
          {content}
          <img
            src={ArrowDownPNG}
            alt="arrow"
            className={classes["arrow"]}
            style={{
              transform: isActive ? "rotate(360deg)" : "rotate(0deg)",
              transition: "all 0.5s ease",
            }}
          />
        </header>
      </button>
      {isActive && (
        <div
          className={
            position !== "last"
              ? classes["children"] + " " + classes["children-after"]
              : classes["children"]
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};
