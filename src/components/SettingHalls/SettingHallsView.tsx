import classes from "./settingHalls.module.scss";
import { MouseEvent } from "react";
import { Dropdown } from "@/components";
import BinPNG from "@/assets/bin.png";
import { HallPopup, HallRemovePopup, Loader } from "@/components";

type TProps = {
  position: "first" | "middle" | "last";
  availableHalls: {
    name: string;
    id: number;
  }[];
  createHall: boolean;
  deleteHall: boolean;
  currentHall: { id: number | null; name: string };
  handleHallPopup: (event: MouseEvent<HTMLElement>) => void;
  handleDeleteHallPopup: (
    event: MouseEvent,
    hallId?: number,
    hallName?: string,
  ) => void;
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
  deleteHall,
  currentHall,
  handleHallPopup,
  handleDeleteHallPopup,
  handleCancel,
  setHall,
  setCreateHall,
  handleDeleteHall,
  popupRef,
}: TProps) => {
  return (
    <>
      {deleteHall && (
        <HallRemovePopup
          currentHall={currentHall}
          handlePopup={handleDeleteHallPopup}
          handleDeleteHall={handleDeleteHall}
          handleCancel={handleCancel}
          popupRef={popupRef}
        />
      )}
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
                    onClick={(event: MouseEvent) =>
                      handleDeleteHallPopup(event, hall.id, hall.name)
                    }
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
