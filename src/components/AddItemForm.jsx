import { MenuItem, TextField, Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomTable from "../commons/Table";
import { apiUrl } from "../config";
import { useGlobalContext } from "../context";

const initialValue = {
  heading: '',
  description: '',
  time: {
    days: 1,
    hrs: 0,
    mins: 0,
  },
  points: ''
}

// const details = [
//     { label: "Heading", field: "Heading" },
//     { label: "Description", field: "Description" },
//     { label: "Heading", field: "Durjj" },
//     { label: "Heading", field: "Heading" },
//     { label: "Heading", field: "Heading" },
// ];

export default function AddItemForm() {
    const classes = {};
    const [task, setTask] = useState(initialValue);
    const [workers, setWorkers] = useState([]);
    const [isWorkersLoading, setIsWorkersLoading] = useState(false);
    const { currentUser } = useGlobalContext();
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
    const handleAddTask = (e) =>{
      e.preventDefault();
      axios({
        method: 'post',
        url: `${apiUrl}/postTask`,
        data: {
            ...task,
            MID: currentUser._id,
        }
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
    }

    const rows = [
        createData(
            "Heading",
            <TextField
                onChange={handleChangeData}
                name="heading"
                value={task.heading}
            />
        ),
        createData(
            "Description",
            <TextField
                name="description"
                onChange={handleChangeDescription}
                value={task.description}
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
                    value={task.time.days}
                    inputProps={{ min: 0, max: 30 }}
                />
                <span style={{ margin: "0 1em" }}>Days</span>
                <TextField
                    type="number"
                    name="hrs"
                    onChange={handleChangeDuration}
                    value={task.time.hrs}
                    inputProps={{ min: 0, max: 24 }}
                />
                <span style={{ margin: "0 1em" }}>Hr</span>
                <TextField
                    type="number"
                    onChange={handleChangeDuration}
                    name="mins"
                    value={task.time.mins}
                    inputProps={{ min: 0, max: 60 }}
                />
                <span style={{ margin: "0 1em" }}>Min</span>
            </>
        ),
        createData(
            "Total Points", 
            <TextField
                name="points"
                onChange={handleChangePoints}
                value={task.points}
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
                />
                <Button variant="contained" color="primary" children="Save" onClick={handleAddTask}/>
            </div>
        </div>
    );
}
