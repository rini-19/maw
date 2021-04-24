import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { popupStyles } from "../styles/commonStyles";

export default function Popup({
    openPopup,
    title,
    content,
    background,
    actions,
    isClosable,
    setOpenPopup,
}) {
    const classes = popupStyles();
    const handleClose = () => {
        setOpenPopup("");
    };
    return (
        <Dialog open={openPopup} maxWidth={false}>
            {title != undefined && (
                <DialogTitle
                    id="confirmation-dialog-title"
                    disableTypography
                    className={classes.dialogTitle}
                >
                    {title}
                    {isClosable && (
                        <Button
                            className={classes.closeButton}
                            size="small"
                            variant="text"
                            color="primary"
                            children={<Close fontSize="small" />}
                            onClick={handleClose}
                        />
                    )}
                </DialogTitle>
            )}
            <DialogContent dividers className={classes.transparent}>
                {content}
            </DialogContent>
            {actions !== undefined && (
                <DialogActions style={{ margin: "16px 24px" }}>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
}
