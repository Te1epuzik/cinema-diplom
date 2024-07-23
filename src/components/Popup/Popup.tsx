import { MouseEvent, ReactNode } from "react";
import classes from "./popup.module.scss";
import { CloseSVG } from "@/svg";

type TProps = {
  handlePopup: (event: MouseEvent<HTMLElement>) => void;
  handleCancel: () => void;
  title: ReactNode;
  children: ReactNode;
};

export const Popup = ({
  handlePopup,
  handleCancel,
  title,
  children,
}: TProps) => {
  return (
    <div className={classes["wrapper"]} onClick={handlePopup}>
      <div className={classes["popup"] + " " + "popup"}>
        <header className={classes["header"]}>
          <h2 className={classes["title"]}>{title}</h2>
          <div className={classes["close"]} onClick={handleCancel}>
            <CloseSVG />
          </div>
        </header>
        <div className={classes["content"]}>{children}</div>
      </div>
    </div>
  );
};
