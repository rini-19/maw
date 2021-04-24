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
import React from "react";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import { Link, useHistory } from "react-router-dom";
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

export default function Register() {
    const classes = useStyles();
    const { triggerToaster } = useGlobalContext();
    const [formDetails, setFormDetails] = useState({
        name: "",
        email: "",
        password: "",
        role: "worker",
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const handleChangeDetails = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };
    const handleRegister = () => {
        setIsLoading(true);
        axios
            .post(`${apiUrl}/register`, formDetails)
            .then((res) => {
                triggerToaster(res.data.message, "success");
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                if (err?.response?.data?.message)
                    triggerToaster(err.response.data.message);
            })
            .finally(() => setIsLoading(true));
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paperRoot}>
                <Typography variant="h4" color="primary">
                    Register
                </Typography>
                <form>
                    <div className={classes.inputWrapper}>
                        <FormLabel children="Name" required />
                        <TextField
                            value={formDetails.name}
                            name="name"
                            disabled={isLoading}
                            onChange={handleChangeDetails}
                            variant="outlined"
                        />
                    </div>
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
                                disabled={isLoading}
                                value="worker"
                                control={<Radio color="primary" size="small" />}
                                label="Worker"
                                labelPlacement="end"
                                onChange={handleChangeDetails}
                                name="role"
                            />
                            <FormControlLabel
                                value="manager"
                                disabled={isLoading}
                                control={<Radio color="primary" size="small" />}
                                label="Manager"
                                labelPlacement="end"
                                onChange={handleChangeDetails}
                                name="role"
                            />
                        </RadioGroup>
                    </div>
                    <Button
                        onClick={handleRegister}
                        variant="contained"
                        color="primary"
                        children="Register"
                        disabled={isLoading}
                    />
                </form>
                <p>
                    {" "}
                    Already have an account? <Link to="/"> Login</Link>
                </p>
            </Paper>
        </div>
    );
}
