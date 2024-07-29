import classes from "./settingHalls.module.scss";
import { MouseEvent } from "react";
import { Dropdown } from "@/components";
import BinPNG from "@/assets/bin.png";
import { HallPopup, Loader } from "@/components";

type TProps = {
  position: "first" | "middle" | "last";
  availableHalls: {
    name: string;
    id: number;
  }[];
  createHall: boolean;
  handleHallPopup: (event: MouseEvent<HTMLElement>) => void;
  handleCancel: () => void;
  setHall: any;
  setCreateHall: any;
  handleDeleteHall: (id: number) => void;
  popupRef: React.RefObject<HTMLDivElement>;
};

export const SettingHallsView = ({
  position,
  availableHalls,
  createHall,
  handleHallPopup,
  handleCancel,
  setHall,
  setCreateHall,
  handleDeleteHall,
  popupRef,
}: TProps) => {
  return (
    <>
      {createHall && (
        <HallPopup
          handleHallPopup={handleHallPopup}
          handleCancel={handleCancel}
					popupRef={popupRef}
          setHall={setHall}
          setCreateHall={setCreateHall}
        />
      )}
      {setHall.isLoading && (
        <div className={classes["loader"]}>
          <Loader />
        </div>
      )}
      <Dropdown content="Управление залами" position={position}>
        <div className={classes["setting-halls"]}>
          <div className={classes["halls"]}>
            <span className={classes["available-text"]}>Доступные залы:</span>
            <div className={classes["halls-list"]}>
              {availableHalls.map((hall) => (
                <div key={hall.id} className={classes["hall"]}>
                  <span className={classes["hall-name"]}>
                    &ndash; {hall.name}
                  </span>
                  <button
                    className={classes["delete-hall"]}
                    onClick={() => handleDeleteHall(hall.id)}
                  >
                    <img
                      className={classes["bin"]}
                      src={BinPNG}
                      alt="Удалить зал"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {!setHall.data?.success && (
            <span className={classes["error"]}>{setHall.data?.error}</span>
          )}
          <button
            onClick={handleHallPopup}
            className={classes["create-hall"] + " " + "button"}
            type="button"
          >
            Создать зал
          </button>
        </div>
      </Dropdown>
    </>
  );
};
