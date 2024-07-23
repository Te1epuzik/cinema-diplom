import { useState, useEffect } from "react";

export const useResize = () => {
	const [width, setWidth] = useState<number | null>(null);
	const [height, setHeight] = useState<number | null>(null);
	const [isTablet, setIsTablet] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			setIsTablet(window.innerWidth < 990);
			setIsMobile(window.innerWidth < 568);
    };

    window.addEventListener("resize", handleResize);

		handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height, isTablet, isMobile };
};
