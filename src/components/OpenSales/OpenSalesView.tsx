import classes from "./openSales.module.scss";
import { Dropdown, Loader } from "@/components";

type TProps = {
  position: "first" | "middle" | "last";
  availableHalls: { name: string; id: number; hallOpen: 0 | 1 }[];
  handleChooseHall: (id: number) => void;
  currentHall: number | null;
	isOpened: 1 | 0;
  handleOpenSales: () => void;
  handleCloseSales: () => void;
  isLoading: boolean;
};

export const OpenSalesView = ({
  position,
  availableHalls,
  handleChooseHall,
  currentHall,
  handleOpenSales,
  handleCloseSales,
  isLoading,
	isOpened,
}: TProps) => {
  return (
    <Dropdown content="Открыть продажи" position={position}>
      <div className={classes["open-sales"]}>
        <div className={classes["choose-hall"]}>
          <label className={classes["title"]}>
            Выберите зал для открытия/закрытия продаж:
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

        {isOpened === 1 ? (
          <>
            <span className={classes["is-sales-open"]}>
              Открыта продажа билетов
            </span>
            <button
              className={classes["close"] + " " + "button-cncl"}
              onClick={handleCloseSales}
            >
              {isLoading ? <Loader /> : "Приостановить продажу билетов"}
            </button>
          </>
        ) : (
          <>
            <span className={classes["is-sales-open"]}>
              Всё готово к открытию
            </span>
            <button
              className={classes["open"] + " " + "button"}
              onClick={handleOpenSales}
            >
              {isLoading ? <Loader /> : "Открыть продажу билетов"}
            </button>
          </>
        )}
      </div>
    </Dropdown>
  );
};
