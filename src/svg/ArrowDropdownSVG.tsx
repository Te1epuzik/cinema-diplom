
type TProps = {
	isActive: boolean;
}

export const ArrowDropdownSVG = ({ isActive }: TProps) => {
  return (
    <svg
      style={{
				transition: "all .25s ease-in-out",
				transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
        width: "26px",
        height: "26px",
				position: "absolute",
				right: "5px",
				top: "6px",
      }}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#63536C"
    >
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );
};
