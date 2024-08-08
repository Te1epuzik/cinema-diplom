import { HintToDndView } from "./HintToDndView";
import { useRef, useState } from "react";
import { useResize } from "@/hooks";

export const HintToDnd = () => {
  const [hintActive, setHintActive] = useState<boolean>(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResize();

  const handleHint = () => {
    setHintActive(!hintActive);
  };

  const handleDismiss = (event: any) => {
    if (hintActive && !hintRef.current?.contains(event.target)) {
      setHintActive(false);
    }
  };

  window.addEventListener("click", handleDismiss);

  return (
    <HintToDndView
      handleHint={handleHint}
      hintActive={hintActive}
      isMobile={isMobile}
      hintRef={hintRef}
    />
  );
};
