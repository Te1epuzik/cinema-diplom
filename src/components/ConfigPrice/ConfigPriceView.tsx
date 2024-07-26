import classes from "./configPrice.module.scss";
import { Dropdown, Loader } from "@/components";

type TProps = {
  position: "first" | "middle" | "last";
  availableHalls: { name: string; id: number }[];
  currentHall: number;
  handleChooseHall: (id: number) => void;
  currentPrices: { standart: string; vip: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isLoading: boolean;
  error: Error | null;
};

export const ConfigPriceView = ({
  position,
  availableHalls,
  currentHall,
  handleChooseHall,
  currentPrices,
  handleChange,
  handleSubmit,
  isLoading,
  error,
}: TProps) => {
  return (
    <Dropdown content="Конфигурация цен" position={position}>
      <div className={classes["config-price"]}>
        <div className={classes["choose-hall"]}>
          <label className={classes["title"]}>
            Выберите зал для конфигурации:
          </label>
          <div className={classes["halls"]}>
            {availableHalls.map((hall) => (
              <div
                key={hall.id}
                className={
                  currentHall === hall.id
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
          <>
            <div className={classes["set-price"]}>
              <label className={classes["title"]}>
                Укажите цены для типов кресел:
              </label>
              <div className={classes["standart"]}>
                <div className={classes["input-wrapper"]}>
                  <label htmlFor="standart1" className={classes["input-label"]}>
                    Цена, рублей
                  </label>
                  <input
                    onChange={handleChange}
                    value={currentPrices.standart}
                    name="standart"
                    id="standart1"
                    type="number"
                    className={classes["input"] + " " + "input-text"}
                    placeholder="0"
                  />
                </div>
                <div className={classes["description"]}>
                  за&nbsp;<div className="standart"></div>&nbsp;обычные кресла
                </div>
              </div>
              <div className={classes["vip"]}>
                <div className={classes["input-wrapper"]}>
                  <label htmlFor="vip1" className={classes["input-label"]}>
                    Цена, рублей
                  </label>
                  <input
                    onChange={handleChange}
                    value={currentPrices.vip}
                    name="vip"
                    id="vip1"
                    type="number"
                    className={classes["input"] + " " + "input-text"}
                    placeholder="0"
                  />
                </div>
                <div className={classes["description"]}>
                  за&nbsp;<div className="vip"></div>&nbsp;VIP кресла
                </div>
              </div>
            </div>
            {error && (
              <span className={classes["error"]}>Произошла ошибка!</span>
            )}
            <div className={classes["btns-wrapper"]}>
              <button
                onClick={() => handleChooseHall(0)}
                className={classes["cancel"] + " " + "button-cncl"}
                type="button"
              >
                Отмена
              </button>
              <button
                onClick={handleSubmit}
                className={classes["save"] + " " + "button"}
                type="button"
              >
                {isLoading ? <Loader /> : "Сохранить"}
              </button>
            </div>
          </>
        )}
      </div>
    </Dropdown>
  );
};
