import { useState, useEffect } from "react";

export const useResize = () => {
	const [width, setWidth] = useState<number | null>(null);
	const [height, setHeight] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

		handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height, isMobile };
};
