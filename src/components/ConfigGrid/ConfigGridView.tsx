import classes from "./configGrid.module.scss";
import { Loader } from "@/components";

type TProps = {
  config: string[][];
  isTablet: boolean;
  isMobile: boolean;
  setCurrentHall: (id: number) => void;
  handleChangeSeat: (i: number, j: number) => void;
  handleSubmitChanges: (config: string[][]) => void;
	ConfigHall: any;
};

export const ConfigGridView = ({
  config,
  isTablet,
  isMobile,
  setCurrentHall,
  handleChangeSeat,
  handleSubmitChanges,
	ConfigHall,
}: TProps) => {
  return (
    <div className={classes["config-grid"]}>
      <label className={classes["description"]}>
        Чтобы изменить вид кресла, нажмите по нему{" "}
        {isTablet || (isMobile && "левой кнопкой мыши")}
      </label>
      <div className={classes["config"]}>
        <span className={classes["screen"]}>Экран</span>
        <div className={classes["grid"]}>
          {config.map((row, i) => (
            <div key={i} className={classes["row"]}>
              {row.map((_seat, j) => (
                <div
                  key={j}
                  className={classes["seat"] + " " + row[j]}
                  onClick={() => handleChangeSeat(i, j)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={classes["btns-wrapper"]}>
        <button
          onClick={() => setCurrentHall(0)}
          className={classes["cancel"] + " " + "button-cncl"}
          type="button"
        >
          Отмена
        </button>
        <button
          className={classes["save"] + " " + "button"}
          type="button"
          onClick={() => handleSubmitChanges(config)}
        >
          {ConfigHall.isLoading ? <Loader /> : "Сохранить"}
        </button>
      </div>
    </div>
  );
};
