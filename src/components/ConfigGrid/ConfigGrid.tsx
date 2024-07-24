import { ConfigGridView } from "./ConfigGridView";
import { useEffect, useState } from "react";
import { useResize } from "@/hooks";

type TProps = {
  seats: string[][];
  size: {
    row: number;
    col: number;
  };
  setCurrentHall: (id: number) => void;
	handleSubmitChanges: (config: string[][]) => void;
	ConfigHall: any;
};

export const ConfigGrid = ({
  seats,
  size,
  setCurrentHall,
	handleSubmitChanges,
	ConfigHall,
}: TProps) => {
  const [config, setConfig] = useState<string[][]>([]);
  const { isTablet, isMobile } = useResize();
	
	const seatTypes = ["standart", "vip", "disabled"];

  const handleChangeSeat = (i: number, j: number) => {
    setConfig((prev) => {
      const changedConfig: string[][] = prev.map((row, rowIndex) => {
        if (rowIndex !== i) {
          return row;
        }

        return row.map((col, colIndex) => {
          if (colIndex !== j) {
            return col;
          }

          const currentSeatStatusIndex = seatTypes.indexOf(col);
          console.log(seatTypes[currentSeatStatusIndex + 1]);

          return seatTypes[currentSeatStatusIndex + 1] || "standart";
        });
      });

      return changedConfig;
    });
  };


  useEffect(() => {
    console.log(ConfigHall.data);
  }, [ConfigHall.data]);

  useEffect(() => {
    if (size.row > 12 || size.col > 12 || size.row < 0 || size.col < 0) {
      return;
    }

    console.log(seats);
    if (seats.length === size.row && seats[0].length === size.col) {
      setConfig(seats);
      return;
    }

    setConfig(() => {
      const newConfig: string[][] = [];

      for (let i = 0; i < size.row; i++) {
        newConfig.push([]);
        for (let j = 0; j < size.col; j++) {
          newConfig[i].push("standart");
        }
      }

      return newConfig;
    });
  }, [size]);

  return (
    <ConfigGridView
      config={config}
      isTablet={isTablet}
      isMobile={isMobile}
      setCurrentHall={setCurrentHall}
      handleChangeSeat={handleChangeSeat}
      handleSubmitChanges={handleSubmitChanges}
			ConfigHall={ConfigHall}
    />
  );
};
