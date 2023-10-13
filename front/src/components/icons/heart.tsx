import { FC } from "react";
import { Icon } from "@chakra-ui/react";

const HeartIcon: FC<{ w: string; h: string }> = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      strokeMiterlimit="10"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.5"
      stroke="#333"
      fill="#ff5100"
      d="M70 15.595h0c-11.046 0-20 8.954-20 20 0-11.046-8.954-20-20-20h0c-11.046 0-20 8.954-20 20v.265c0 22.091 30.335 48.545 40 48.545S90 57.951 90 35.86v-.265c0-11.046-8.954-20-20-20z"
    ></path>
  </Icon>
);

export default HeartIcon;
