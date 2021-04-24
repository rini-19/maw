import {
    Button,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Paper,
    RadioGroup,
    TextField,
    Typography,
    Radio,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import { useGlobalContext } from "../context";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paperRoot: {
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& > form ": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    inputWrapper: {
        padding: "1em 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& > label": {
            width: "7em",
        },

        "& > div": {
            marginLeft: "1em",
        },
    },
}));

export default function Login() {
    const classes = useStyles();
    const { triggerToaster, setCurrentUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: "",
        role: "worker",
    });
    const handleChangeDetails = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };
    const handleLogin = () => {
        setIsLoading(true);
        axios
            .post(`${apiUrl}/login`, formDetails)
            .then((res) => {
                console.log(res);
                triggerToaster(res.data.message, "success");
                setCurrentUser({ ...res.data.user, role: formDetails.role });
            })
            .catch((err) => {
                if (err?.response?.data?.length)
                    triggerToaster(err.response.data);
            })
            .finally(() => setIsLoading(false));
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paperRoot}>
                <Typography variant="h4" color="primary">
                    Login
                </Typography>
                <form>
                    <div className={classes.inputWrapper}>
                        <FormLabel children="Email" required />
                        <TextField
                            value={formDetails.email}
                            disabled={isLoading}
                            name="email"
                            onChange={handleChangeDetails}
                            variant="outlined"
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <FormLabel children="Password" required />
                        <TextField
                            type="password"
                            disabled={isLoading}
                            value={formDetails.password}
                            name="password"
                            onChange={handleChangeDetails}
                            variant="outlined"
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <FormLabel comoponent="label" required>
                            User Type
                        </FormLabel>
                        <RadioGroup row defaultValue={formDetails.role}>
                            <FormControlLabel
                                value="worker"
                                control={<Radio color="primary" size="small" />}
                                disabled={isLoading}
                                label="Worker"
                                labelPlacement="end"
                                onChange={handleChangeDetails}
                                name="role"
                            />
                            <FormControlLabel
                                value="manager"
                                control={<Radio color="primary" size="small" />}
                                label="Manager"
                                labelPlacement="end"
                                onChange={handleChangeDetails}
                                disabled={isLoading}
                                name="role"
                            />
                        </RadioGroup>
                    </div>
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        children="Login"
                    />
                </form>
                <p>
                    {" "}
                    Don't have account? <Link to="register"> Register</Link>
                </p>
            </Paper>
        </div>
    );
}
