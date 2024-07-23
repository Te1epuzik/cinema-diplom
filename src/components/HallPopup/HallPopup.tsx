import { HallPopupView } from "./HallPopupView";
import { MouseEvent, useState, ChangeEvent } from "react";

type TProps = {
  handleHallPopup: (event: MouseEvent<HTMLElement>) => void;
  handleCancel: () => void;
  setHall: any;
  setCreateHall: any;
};

export const HallPopup = ({
  handleHallPopup,
  handleCancel,
  setHall,
  setCreateHall,
}: TProps) => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) {
      setValue("");
    }
    setValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHall.fetchData({
      method: "post",
      body: { hallName: value },
    });
		setCreateHall(false)
  };

  return (
    <HallPopupView
      handleHallPopup={handleHallPopup}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      value={value}
      isLoading={setHall.isLoading}
    />
  );
};
