import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    props: {
        MuiTextField: {
            size: "small",
            SelectProps: {
                displayEmpty: true,
            },
        },
    },
    overrides: {
        MuiInput: {
            root: {
                fontSize: "1em",
                padding: "0 0.5em",
            },
        },
        MuiFormLabel: {
            asterisk: {
                color: "#bf0000",
            },
        },
    },
});
