import classes from "./dropDownList.module.scss";
import { ArrowDropdownSVG } from "@/svg";

type TProps = {
  children: React.ReactNode;
  selectedItem: string;
  handleToggleDropDown: () => void;
  isActive: boolean;
  dropdownRef: React.RefObject<HTMLButtonElement>;
  id?: string;
};

export const DropdownListView = ({
  children,
  selectedItem,
  handleToggleDropDown,
  dropdownRef,
  isActive,
  id,
}: TProps) => {
  return (
    <div className={classes["dropdown"]}>
      <button
        ref={dropdownRef}
        id={id || ""}
        type="button"
        className={classes["dropdown-content"] + " " + "input-text"}
        onClick={handleToggleDropDown}
      >
        {selectedItem}
        <ArrowDropdownSVG isActive={isActive} />
      </button>
      {isActive && <div className={classes["dropdown-inner"]}>{children}</div>}
    </div>
  );
};
