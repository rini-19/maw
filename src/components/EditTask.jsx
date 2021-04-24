import { MenuItem, TextField, Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomTable from "../commons/Table";
import { apiUrl } from "../config";

const details = [
    { label: "Heading", field: "Heading" },
    { label: "Description", field: "Description" },
    { label: "Heading", field: "Durjj" },
    { label: "Heading", field: "Heading" },
    { label: "Heading", field: "Heading" },
];
export default function EditTask({ taskDetails, setOpenPopup }) {
    const classes = {};
    const [task, setTask] = useState(taskDetails);
    const [workers, setWorkers] = useState([]);
    const [isWorkersLoading, setIsWorkersLoading] = useState(false);
    useEffect(() => {
        setIsWorkersLoading(true);
        axios
            .get(`${apiUrl}/getWorkers`)
            .then((res) => {
                setWorkers(res.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsWorkersLoading(false));
    }, []);
    const columns = [
        { id: "field", label: "" },
        { id: "value", label: "", minWidth: "10em" },
    ];
    const createData = (field, value) => {
        return { field, value };
    };
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setTask((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleChangeDescription = (e) => {
        const { name, value } = e.target;
        setTask((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleChangeDuration = (e) => {
        const { name, value } = e.target;
        setTask((prevState) => ({
            ...prevState,
            Time: { ...prevState.Time, [name]: value },
        }));
    };
    const handleChangePoints = (e) => {
        const { name, value } = e.target;
        setTask((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleEditTask = () => {
        axios
            .patch(`${apiUrl}/editTask/${taskDetails._id}`, { task })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const rows = [
        createData("Task ID", task._id),
        createData(
            "Heading",
            <TextField
                onChange={handleChangeData}
                name="Heading"
                value={task.Heading}
            />
        ),
        createData(
            "Description",
            <TextField
                name="Description"
                onChange={handleChangeDescription}
                value={task.Description}
                fullWidth
                multiline={true}
            />
        ),
        createData(
            "Duration",
            <>
                <TextField
                    type="number"
                    name="days"
                    onChange={handleChangeDuration}
                    value={task.Time.Days}
                    inputProps={{ min: 0, max: 30 }}
                />
                <span style={{ margin: "0 1em" }}>Days</span>
                <TextField
                    type="number"
                    name="hrs"
                    onChange={handleChangeDuration}
                    value={task.Time.Hrs}
                    inputProps={{ min: 0, max: 24 }}
                />
                <span style={{ margin: "0 1em" }}>Hr</span>
                <TextField
                    type="number"
                    onChange={handleChangeDuration}
                    name="mins"
                    value={task.Time.Mins}
                    inputProps={{ min: 0, max: 60 }}
                />
                <span style={{ margin: "0 1em" }}>Min</span>
            </>
        ),
        createData(
            "Total Points",
            <TextField
                name="TotalPoints"
                onChange={handleChangePoints}
                value={task.TotalPoints}
                fullWidth
                multiline={true}
            />
        ),
    ];
    return (
        <div style={{ maxWidth: "50vw", minWidth: "400px" }}>
            <CustomTable rows={rows} columns={columns} showTableHead={false} />
            <div
                style={{
                    display: "flex",
                    padding: "1em 0 0",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    variant="outlined"
                    color="secondary"
                    children="Discard"
                    onClick={() => setOpenPopup("")}
                />
                <Button
                    variant="contained"
                    color="primary"
                    children="Save"
                    onClick={handleEditTask}
                />
            </div>
        </div>
    );
}
