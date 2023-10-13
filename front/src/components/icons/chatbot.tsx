import { FC } from "react";
import { Icon } from "@chakra-ui/react";

const ChatbotIcon: FC<{ w: string; h: string }> = (props) => (
  <Icon viewBox="0 0 42 42" {...props}>
    <path
      d="M11.8125 2.625C9.1702 2.625 7 4.7952 7 7.4375V11.375H4.8125C3.13691 11.375 1.75 12.7619 1.75 14.4375V18.8125C1.75 20.4881 3.13691 21.875 4.8125 21.875H7V25.8125C7 28.4548 9.1702 30.625 11.8125 30.625H30.1875C32.8298 30.625 35 28.4548 35 25.8125V21.875H37.625V31.0625C37.625 33.2531 35.8781 35 33.6875 35H25.9526C25.7044 34.4767 25.3128 34.0345 24.8234 33.7247C24.334 33.415 23.7667 33.2504 23.1875 33.25C22.3753 33.25 21.5963 33.5727 21.022 34.147C20.4477 34.7213 20.125 35.5003 20.125 36.3125C20.125 37.1247 20.4477 37.9037 21.022 38.478C21.5963 39.0523 22.3753 39.375 23.1875 39.375C23.7664 39.3743 24.3333 39.2096 24.8224 38.8998C25.3115 38.5901 25.7028 38.1481 25.9509 37.625H33.6875C37.2964 37.625 40.25 34.6714 40.25 31.0625V20.5625V19.0312V14.4375C40.25 12.7619 38.8631 11.375 37.1875 11.375H35V7.4375C35 4.7952 32.8298 2.625 30.1875 2.625H11.8125ZM11.8125 5.25H30.1875C31.4109 5.25 32.375 6.21405 32.375 7.4375V12.6875V20.5625V25.8125C32.375 27.0359 31.4109 28 30.1875 28H11.8125C10.5891 28 9.625 27.0359 9.625 25.8125V20.5625V12.6875V7.4375C9.625 6.21405 10.5891 5.25 11.8125 5.25ZM14.875 12.25C14.4109 12.25 13.9658 12.4344 13.6376 12.7626C13.3094 13.0908 13.125 13.5359 13.125 14C13.125 14.4641 13.3094 14.9092 13.6376 15.2374C13.9658 15.5656 14.4109 15.75 14.875 15.75C15.3391 15.75 15.7842 15.5656 16.1124 15.2374C16.4406 14.9092 16.625 14.4641 16.625 14C16.625 13.5359 16.4406 13.0908 16.1124 12.7626C15.7842 12.4344 15.3391 12.25 14.875 12.25ZM27.125 12.25C26.6609 12.25 26.2158 12.4344 25.8876 12.7626C25.5594 13.0908 25.375 13.5359 25.375 14C25.375 14.4641 25.5594 14.9092 25.8876 15.2374C26.2158 15.5656 26.6609 15.75 27.125 15.75C27.5891 15.75 28.0343 15.5656 28.3624 15.2374C28.6906 14.9092 28.875 14.4641 28.875 14C28.875 13.5359 28.6906 13.0908 28.3624 12.7626C28.0343 12.4344 27.5891 12.25 27.125 12.25ZM4.8125 14H7V19.25H4.8125C4.55434 19.25 4.375 19.0707 4.375 18.8125V14.4375C4.375 14.1793 4.55434 14 4.8125 14ZM35 14H37.1875C37.4457 14 37.625 14.1793 37.625 14.4375V19.0312V19.25H35V14ZM26.6755 20.1062C26.3289 20.1144 25.9996 20.2594 25.7595 20.5095C25.7595 20.5095 25.5297 20.7632 24.7615 21.1248C23.9933 21.4863 22.7743 21.875 21 21.875C19.2257 21.875 18.0067 21.4863 17.2385 21.1248C16.4703 20.7632 16.2405 20.5095 16.2405 20.5095C16.1181 20.3835 15.9718 20.2834 15.81 20.215C15.6483 20.1466 15.4744 20.1113 15.2988 20.1113C15.0376 20.1114 14.7824 20.1894 14.5657 20.3353C14.3491 20.4813 14.1809 20.6885 14.0828 20.9306C13.9846 21.1726 13.9609 21.4385 14.0146 21.6941C14.0684 21.9497 14.1972 22.1835 14.3845 22.3655C14.3845 22.3655 15.0297 22.9868 16.1208 23.5002C17.212 24.0137 18.8368 24.5 21 24.5C23.1632 24.5 24.788 24.0137 25.8792 23.5002C26.9703 22.9868 27.6155 22.3655 27.6155 22.3655C27.8063 22.1823 27.9374 21.9457 27.9915 21.6867C28.0455 21.4278 28.0201 21.1585 27.9185 20.9143C27.8169 20.67 27.6438 20.4622 27.422 20.318C27.2002 20.1738 26.94 20.1 26.6755 20.1062Z"
      fill="white"
    />
  </Icon>
);

export default ChatbotIcon;