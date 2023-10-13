import { FC } from "react";
import { Icon } from "@chakra-ui/react";

const StarIcon: FC<{ w: string; h: string; filled: string }> = (props) => (
  <Icon maxW="24px" viewBox="0 0 24 25" {...props}>
    <path
      fill={props.filled}
      d="M12 18.25L6.25 21.25L7.25 14.75L2.75 10.25L9.25 9.25L12 3.75L14.75 9.25L21.25 10.25L16.75 14.75L17.75 21.25L12 18.25Z"
      stroke="#FF5100"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </Icon>
);

export default StarIcon;
