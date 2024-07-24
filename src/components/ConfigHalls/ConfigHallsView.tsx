import classes from "./configHalls.module.scss";
import { Dropdown, ConfigGrid } from "@/components";

type TProps = {
  position: "first" | "middle" | "last";
  availableHalls: { name: string; id: number }[];
  handleChooseHall: (id: number) => void;
  currentHall: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  handleChangeSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  row: number;
  col: number;
  seats: string[][];
  setCurrentHall: (id: number) => void;
  handleSubmitChanges: (config: string[][]) => void;
  ConfigHall: any;
};

export const ConfigHallsView = ({
  position,
  availableHalls,
  handleChooseHall,
  currentHall,
  scrollRef,
  handleChangeSize,
  row,
  col,
  seats,
  setCurrentHall,
  handleSubmitChanges,
  ConfigHall,
}: TProps) => {
  return (
    <Dropdown content="Конфигурация залов" position={position}>
      <div className={classes["config-halls"]}>
        <div className={classes["choose-hall"]}>
          <label className={classes["title"]}>
            Выберите зал для конфигурации:
          </label>
          <div className={classes["halls"]} ref={scrollRef}>
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
                min="5"
                max="10"
                disabled={currentHall === 0 ? true : false}
                placeholder="5"
              />
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
                min="5"
                max="12"
                disabled={currentHall === 0 ? true : false}
                placeholder="5"
              />
            </div>
          </div>
        </div>
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
