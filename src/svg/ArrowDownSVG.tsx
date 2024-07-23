type TProps = {
  isActive?: boolean;
};

export const ArrowDownSVG = ({ isActive }: TProps) => {
  return (
    <svg
      style={{
        transform: isActive ? "rotate(360deg)" : "rotate(0deg)",
        transition: "transform .5s",
      }}
      width="24"
      height="17"
      viewBox="0 0 24 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect y="0.800049" width="24" height="16" fill="url(#pattern0_31_1181)" />
      <defs>
        <pattern
          id="pattern0_31_1181"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_31_1181"
            transform="scale(0.0208333 0.03125)"
          />
        </pattern>
        <image
          id="image0_31_1181"
          width="48"
          height="32"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGCSURBVHgBzZjhcYQgEIXXVHAlXAmXDlLCdXDpRDuwBK+DpANLsATSQdLBC0RMGHPqsgvoN8PM/RD4HqKsRxQA4Gxbb9snRtzvK+2EnfvFO8A7dc5x6eJLID6nocK4ORdcnONlfrFbeYN1blQIO9frhov5vRNM+WIh7BxXpoux7eQ6dODz//allV/bxo+oCfzVzxoC406IkXcYggyDpbeBXN5AgOscmzppCI28c3+yY9xJxtm2XhPC9+39WBLepXtvfidOFInrA/nK/6w+gldp7NM/Z4gJ4eUHyHl4mG0dHlv0EQHeoOO2NLA2RMeQv0PHbWuCGjralbEb6KiJQ4IQzW7yOUIUlw8mbqGjgV6+JQ3QP3QaOkoB/r6KSsJ+LXMCaA+eWNgHY0VM/IADyesWLh+2PVdV9UWpga5y5GCQsEwvHcJkl88YwhSTD0JoK9iJrN/ZuUPsJx+E0FSwxf5rWkUY4hjyE4gr/mTFWW6YIY4pP7ER4tjyExifibB26nPt+W85xjZJlGZcvgAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};
