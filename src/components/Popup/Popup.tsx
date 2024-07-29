import { MouseEvent, ReactNode } from "react";
import classes from "./popup.module.scss";
import { CloseSVG } from "@/svg";

type TProps = {
  handlePopup: (event: MouseEvent<HTMLElement>) => void;
  handleCancel: () => void;
  title: ReactNode;
  children: ReactNode;
	popupRef: React.RefObject<HTMLDivElement>;
};

export const Popup = ({
  handlePopup,
  handleCancel,
  title,
  children,
	popupRef,
}: TProps) => {
  return (
    <div className={classes["wrapper"]} onClick={handlePopup}>
      <div className={classes["popup"] + " " + "popup"} ref={popupRef}>
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
