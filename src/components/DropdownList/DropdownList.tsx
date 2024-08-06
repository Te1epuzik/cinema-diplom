import { DropdownListView } from "./DropdownListView";
import { useRef, useState } from "react";

type TProps = {
  children: React.ReactNode;
  selectedItem: string;
  id?: string;
};

export const DropdownList = ({ children, selectedItem, id }: TProps) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [isActive, setActive] = useState<boolean>(false);

  const handleToggleDropDown = (): void => {
    setActive(!isActive);
  };

  const handleDismiss = (event: any) => {
    if (isActive && !dropdownRef.current?.contains(event.target)) {
      setActive(false);
    }
  };

  window.addEventListener("click", handleDismiss);
  return (
    <DropdownListView
      dropdownRef={dropdownRef}
      children={children}
      selectedItem={selectedItem}
      handleToggleDropDown={handleToggleDropDown}
      isActive={isActive}
      id={id}
    />
  );
};
