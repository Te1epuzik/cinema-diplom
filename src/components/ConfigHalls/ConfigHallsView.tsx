import classes from "./configHalls.module.scss";
import { Dropdown, ConfigGrid } from "@/components";
import { ArrowIncSVG, ArrowDecSVG } from "@/svg";

type TProps = {
  position: "first" | "middle" | "last";
  availableHalls: { name: string; id: number }[];
  handleChooseHall: (id: number) => void;
  currentHall: number;
  handleChangeSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  row: number;
  col: number;
  seats: string[][];
  setCurrentHall: (id: number) => void;
  handleSubmitChanges: (config: string[][]) => void;
  ConfigHall: any;
  hendlersNums: {
    rowInc: () => void;
    rowDec: () => void;
    colInc: () => void;
    colDec: () => void;
  };
};

export const ConfigHallsView = ({
  position,
  availableHalls,
  handleChooseHall,
  currentHall,
  handleChangeSize,
  row,
  col,
  seats,
  setCurrentHall,
  handleSubmitChanges,
  ConfigHall,
	hendlersNums,
}: TProps) => {
  return (
    <Dropdown content="Конфигурация залов" position={position}>
      <div className={classes["config-halls"]}>
        <div className={classes["choose-hall"]}>
          <label className={classes["title"]}>
            Выберите зал для конфигурации:
          </label>
          <div className={classes["halls"]}>
            {availableHalls.map((hall) => (
              <div
                key={hall.id}
                className={
                  hall.id === currentHall
                    ? classes["hall"] + " " + classes["hall--active"]
                    : classes["hall"]
                }
                onClick={() => handleChooseHall(hall.id)}
              >
                {hall.name}
              </div>
            ))}
          </div>
        </div>
        {currentHall !== 0 && (
          <div className={classes["choose-seats"]}>
            <label className={classes["title"]}>
              Укажите количество рядов и максимальное количество кресел в ряду:
            </label>
            <div className={classes["seats-quantity"]}>
              <div className={classes["rows"]}>
                <label className={classes["label"]} htmlFor="rows1">
                  Рядов, шт
                </label>
                <input
                  onChange={handleChangeSize}
                  value={row}
                  className={classes["rows-input"] + " " + "input-text"}
                  type="number"
                  name="row"
                  id="rows1"
                  disabled
                  placeholder="5"
                />
                <div className={classes["num-btns"]}>
                  <button
                    type="button"
                    className={classes["increment"] + " " + "button"}
										onClick={hendlersNums.rowInc}
                  >
                    <ArrowIncSVG />
                  </button>
                  <button
                    type="button"
                    className={classes["decrement"] + " " + "button"}
										onClick={hendlersNums.rowDec}
                  >
                    <ArrowDecSVG />
                  </button>
                </div>
              </div>
              <div className={classes["x"]}>x</div>
              <div className={classes["seats"]}>
                <label className={classes["label"]} htmlFor="seats2">
                  Мест, шт
                </label>
                <input
                  onChange={handleChangeSize}
                  value={col}
                  className={classes["seats-input"] + " " + "input-text"}
                  type="number"
                  name="seats"
                  id="seats2"
                  disabled
                  placeholder="5"
                />
                <div className={classes["num-btns"]}>
                  <button
                    type="button"
                    className={classes["increment"] + " " + "button"}
										onClick={hendlersNums.colInc}
                  >
                    <ArrowIncSVG />
                  </button>
                  <button
                    type="button"
                    className={classes["decrement"] + " " + "button"}
										onClick={hendlersNums.colDec}
                  >
                    <ArrowDecSVG />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentHall !== 0 && (
          <div className={classes["grid-legend"]}>
            <label className={classes["title"]}>
              Теперь вы можете указать типы кресел на схеме зала:
            </label>
            <div className={classes["legend"]}>
              <div className={classes["starndart-seat"]}>
                <div className="standart"></div>
                <label className={classes["description"]}>
                  &mdash; обычные кресла
                </label>
              </div>
              <div className={classes["vip-seat"]}>
                <div className="vip"></div>
                <label className={classes["description"]}>
                  &mdash; VIP кресла
                </label>
              </div>
              <div className={classes["disabled-seat"]}>
                <div className="disabled"></div>
                <label className={classes["description"]}>
                  &mdash; заблокированные {"(нет кресла)"}
                </label>
              </div>
            </div>
          </div>
        )}
        {currentHall !== 0 && seats && (
          <ConfigGrid
            size={{ row, col }}
            seats={seats}
            setCurrentHall={setCurrentHall}
            handleSubmitChanges={handleSubmitChanges}
            ConfigHall={ConfigHall}
          />
        )}
      </div>
    </Dropdown>
  );
};
