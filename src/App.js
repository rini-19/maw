import React, { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { theme } from "./styles/customTheme";

import ManagerDashboard from "./pages/ManagerDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Switch } from "react-router-dom";
import { GlobalContext } from "./context";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Work } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(6),
        },
    },
}));

function App() {
    const classes = useStyles();
    const [role, setRole] = useState(null);
    const [authToken, setAuthToken] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [toaster, setToaster] = useState({
        isOpen: false,
        message: "Testing taoaster",
        severity: "error",
    });
    const handleCloseToaster = () => {
        setToaster({ isOpen: false, severity: "", message: "" });
    };
    const triggerToaster = (message, severity = "error") => {
        setToaster({ isOpen: true, message, severity });
    };
    console.log(currentUser);
    return (
        <ThemeProvider theme={theme}>
            <GlobalContext.Provider
                value={{
                    authToken,
                    setAuthToken,
                    currentUser,
                    setCurrentUser,
                    triggerToaster,
                }}
            >
                <div>
                    <Switch>
                        <Route exact path="/">
                            {!currentUser?.role?.length ? (
                                <Login />
                            ) : /* <div className={classes.root}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setRole("manager")}
                        >
                            Manager
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setRole("worker")}
                        >
                            Worker
                        </Button>
                    </div> */
                            currentUser.role === "manager" ? (
                                <ManagerDashboard />
                            ) : (
                                <WorkerDashboard />
                            )}
                        </Route>
                        <Route exact path="/register">
                            {" "}
                            <Register />
                        </Route>
                    </Switch>
                </div>
                <Snackbar
                    open={toaster.isOpen}
                    autoHideDuration={3000}
                    onClose={handleCloseToaster}
                >
                    <Alert
                        onClose={handleCloseToaster}
                        severity={toaster.severity}
                    >
                        {toaster.message}
                    </Alert>
                </Snackbar>
            </GlobalContext.Provider>{" "}
        </ThemeProvider>
    );
}

export default App;
