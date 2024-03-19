export const Theme = () => ({
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          "&.productImage": {
            borderRadius: "500px",
            border: "1px solid grey",
            height: "300px",
            width: "250px",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontFamily: "Anta, sans-serif",
        },
        cell: {
          color: "#e4c20b",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.loginInput": {
            borderTop: "1px solid red",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Anta, sans-serif",
          "&.productFormLabel": {
            color: "#f17e16",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "Anta, sans-serif",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: "Anta, sans-serif",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fontFamily: "Anta, sans-serif",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#f17e16",
          "&.footerIcon": {
            color: "#f17e16",
          },
          "&.headerIcon": {
            color: "black",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#f17e16",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(202, 202, 202, 0.2)",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.categoryButton": {
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            borderRadius: "10px",
          },
          "&.cartIcon": {
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            borderRadius: "30px",
            marginRight: "10px",
          },
          "&.accountIcon": {
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            borderRadius: "30px",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Anta, sans-serif",
          "&.categoryTypo": {
            fontWeight: 800,
            color: "black",
          },
          "&.logoTypo": {
            fontWeight: 700,
            padding: "0px 5px",
            marginRight: "30px",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            borderRadius: "10px",
            "&:hover": {
              cursor: "pointer",
            },
          },
          "&.loginLogoTypo": {
            fontWeight: 700,
            padding: "0px 10px",
            marginBottom: "20px",
            borderLeft: "1px solid grey",
            borderRight: "1px solid grey",
            borderRadius: "10px",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "-1px 118px 30px -82px rgba(0,0,0,0.3) inset",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Anta, sans-serif",
          fontWeight: 900,
          borderTop: "1px solid grey",
          borderBottom: "1px solid grey",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "lightgrey",
          },
          "&.productButton": {
            width: "300px",
            marginTop: "10px",
          },
          "&.loginButton": {
            fontWeight: 800,
            color: "black",
            width: "100px",
            height: "40px",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#f17e16",
    },
    secondary: {
      main: "#f5b200",
    },
    background: {
      default: "#272727",
      paper: "#1e1e1e",
    },
    text: {
      primary: "rgba(228,116,0,0.87)",
      secondary: "#e4c20b",
      disabled: "#6d4810",
    },
    info: {
      main: "#10e6b7",
    },
  },
});
