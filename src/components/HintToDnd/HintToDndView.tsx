import classes from "./hintToDnd.module.scss";
import DndSVG from "@/assets/drop.svg";
import { ArrowLeftSVG } from "@/svg";

type TProps = {
  handleHint: () => void;
  hintActive: boolean;
  isMobile: boolean;
  hintRef: React.RefObject<HTMLDivElement>;
};

export const HintToDndView = ({
  handleHint,
  hintActive,
  isMobile,
  hintRef,
}: TProps) => {
  return (
    <div
      className={
        hintActive
          ? classes["hint"] + " " + classes["hint--active"]
          : classes["hint"]
      }
      onClick={handleHint}
			ref={hintRef}
    >
      {!hintActive && isMobile && (
        <div className={classes["hint-arrow"]}>
          <ArrowLeftSVG />
        </div>
      )}
      <div className={classes["hint-img"]}>
        <img src={DndSVG} alt="dnd" className={classes["hint-img-inner"]} />
      </div>
      <span className={classes["hint-text"]}>
        Перетащите фильм на нужный зал, что бы создать сеанс
      </span>
    </div>
  );
};
