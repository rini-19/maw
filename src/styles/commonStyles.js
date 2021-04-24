import { makeStyles } from "@material-ui/core";

export const popupStyles = makeStyles((theme) => ({
    titleRoot: {
        padding: "0.75em 1.5em",
        "& h2": {
            height: "40px",
            textAlign: "center",
        },
    },
    dialogTitle: {
        fontSize: "1em",
        color: "#bf0000",
        letterSpacing: "0.5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    closeButton: {
        position: "absolute",
        right: "0",
    },
    contentRoot: {
        padding: "1.5em",
        paddingTop: "1em",
    },
    transparent: {
        backgroundColor: "transparent",
    },
}));
