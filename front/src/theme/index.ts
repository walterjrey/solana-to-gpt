import { extendTheme } from "@chakra-ui/react";
// import styles from "./styles";
// import borders from "./foundations/borders";
// import Button from "./components/button";

const overrides = {
  // styles,
  // borders,
  // Other foundational style overrides go here
  components: {
    Breadcrumb: {
      baseStyle: {
        link: {
          fontFamily: "Roboto",
          fontStyle: "italic",
          fontWeight: "400",
        },
      },
    },
    Tag: {
      variants: {
        soltogpt: {
          backgroundColor: "#ff5100",
          color: "white",
        }
      }
    },
    Button: {
      variants: {
        orangeBtnHW: {
          backgroundColor: "#ff5100",
          padding: "6px",
          color: "white",
        },
        orangeBtn: {
          backgroundColor: "#ff5100",
          borderRadius: "100px",
          borderStyle: "solid",
          borderColor: "#ff5100",
          borderWidth: "0.07rem",
          padding: "8px 32px 8px 32px",
          gap: "0px",
          boxShadow: "0px 0.07rem 0.14rem 0px rgba(0, 0, 0, 0.05)",
          color: "white",
        },
        roundedBtn: {
          borderRadius: "35%",
          borderStyle: "solid",
          borderColor: "#a1b3bd",
          borderWidth: "0.07rem",
        },
        searchBtndark: {
          borderRadius: "625rem",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderWidth: "0.071rem",
          p: "0.5rem 2rem 0.5rem 2rem",
          gap: 0,
          boxShadow: "rgba(0, 0, 0, 0.05)",
          backgroundColor: "inherit",
        },
        searchBtnlight: {
          borderRadius: "625rem",
          borderStyle: "solid",
          borderColor: "#222222",
          borderWidth: "0.071rem",
          p: "0.5rem 2rem 0.5rem 2rem",
          gap: 0,
          boxShadow: "rgba(0, 0, 0, 0.05)",
          backgroundColor: "inherit",
        },
        goChat: {
          backgroundColor: "#ff5100",
          borderRadius: "100px",
          borderStyle: "solid",
          borderColor: "#ff5100",
          borderWidth: "1px",
          padding: "0.5rem 0.75rem 0.5rem 0.75rem",
          gap: "0px",
          boxShadow: "0px 0.07rem 0.14rem 0px rgba(0, 0, 0, 0.05)",
          size: "sm",
          color: "white",
        },
        cancel: {
          borderRadius: "100px",
          borderStyle: "solid",
          borderColor: "#ff5100",
          borderWidth: "0.07rem",
          padding: "0.5rem 2rem 0.5rem 2rem",
          gap: "0px",
          boxShadow: "0px 0.07rem 0.14rem 0px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    Text: {
      variants: {
        whiteButtonText: {
          padding: "0.1rem",
          fontWeight: "700",
          fontFamily: "Roboto, sans-serif",
          fontSize: "1rem",
        },
        description: {
          fontWeight: "400",
          fontStyle: "italic",
          fontSize: "1rem",
          fontFamily: "Roboto, sans-serif",
          mt: 1,
        },
        section: {
          fontSize: "1.13rem",
          fontFamily: "Montserrat",
          fontWeight: "500",
        },
        cardTitle: {
          lineHeight: "150%",
          fontSize: "1.38rem",
          fontFamily: "Montserrat",
          fontWeight: "700",
        },
        footer: {
          fontWeight: "700",
          fontFamily: "Montserrat,sans-serif",
          fontSize: "1.375rem",
        },
      },
    },
    FormLabel: {
      variants: {
        lblWhite: {
          fontWeight: "500",
          fontFamily: "Roboto, sans-serif",
          fontSize: "1.25rem",
        },
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  layerStyles: {
    chatbot: {
      fontFamily: "monospace",
      h1: {
        fontFamily: "monospace",
      },
      h2: {
        fontFamily: "monospace",
      },
    },
  },
  colors: {
    cloudx: {
      main: "#FF5100",
      100: "#FF5100",
    },
  },
};

export default extendTheme(overrides);
