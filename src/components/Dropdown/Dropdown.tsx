import { ReactNode, useState } from "react";
import { useResize } from "@/hooks";

import { DropdownView } from "./DropdownView";

type TProps = {
  content: ReactNode;
  children: ReactNode;
  position: "first" | "midle" | "last";
};

export const Dropdown = ({ content, children, position }: TProps) => {
  const [isActive, setActive] = useState<boolean>(true);
  const { isMobile } = useResize();

  const handleToggleDropDown = (): void => {
    setActive(!isActive);
  };

  return (
    <DropdownView
      content={content}
      children={children}
      isActive={isActive}
      handleToggleDropDown={handleToggleDropDown}
      isMobile={isMobile}
      position={position}
    />
  );
};
