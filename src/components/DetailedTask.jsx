import React, { useState, useEffect } from "react";
import CustomTable from "../commons/Table";
import { MenuItem, TextField, Button } from "@material-ui/core";

import axios from "axios";
import { apiUrl } from "../config";
import { useGlobalContext } from "../context";

const details = [
    { label: "Heading", field: "Heading" },
    { label: "Description", field: "Description" },
    { label: "Heading", field: "Durjj" },
    { label: "Heading", field: "Heading" },
    { label: "Heading", field: "Heading" },
];
export default function DetailedTask({ taskDetails, setOpenPop }) {
    const [workers, setWorkers] = useState([]);
    const [isWorkersLoading, setIsWorkersLoading] = useState(false);
    const [assignedWorker, setAssignedWorker] = useState(taskDetails.WId || "");
    const [content, setContent] = useState("");

    console.log(assignedWorker);
    const classes = {};
    const columns = [
        { id: "field", label: "" },
        { id: "value", label: "" },
    ];
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
    const handleAssignChange = (e) => {
        if (!e?.target) return;
        const { name, value } = e.target;
        setAssignedWorker(value);
    };
    const AssignWorker = () => {
        console.log("in function");
        axios({
            method: "post",
            url: `${apiUrl}/assignTask`,
            data: {
                TID: taskDetails._id,
                MID: currentUser._id,
                WID: assignedWorker,
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const handleChangeContent = (e) => {
        const { value } = e.target;
        setContent(value);
    };
    const handleSubmit = (e) => {
        axios({
            method: 'post',
            url: `${apiUrl}/submitTask`,
            data: {
                TID: taskDetails._id,
                TaskContent: content
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
        console.log("adfs");
    };
    const createData = (field, value) => {
        return { field, value };
    };
    const rows = [
        createData("Heading", taskDetails.Heading),
        createData(
            "Description",
            <span style={{ maxWidth: "10em" }}>{taskDetails.Description}</span>
        ),
        createData(
            "Duration",
            `${taskDetails.Time.Days}Day ${taskDetails.Time.Hrs}Hrs ${taskDetails.Time.Mins}Min`
        ),
        createData("Task ID", taskDetails._id),
        createData("Total Points", taskDetails.TotalPoints),
        currentUser.role === "manager"
            ? createData(
                  "Assignee",
                  <TextField
                      select
                      value={assignedWorker}
                      onChange={handleAssignChange}
                  >
                      {isWorkersLoading ? (
                          <MenuItem key="" value="" children="Loading..." />
                      ) : (
                          workers.map((worker) => {
                              console.log(worker);
                              return (
                                  <MenuItem
                                      key={worker.Name}
                                      value={worker._id}
                                      children={worker.Name}
                                  />
                              );
                          })
                      )}
                  </TextField>
              )
            : createData(
                  "Content Text",
                  <TextField
                      value={content}
                      multiline
                      onChange={handleChangeContent}
                  />
              ),
    ];
    return (
        <div style={{ maxWidth: "30em" }}>
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
                    onClick={() => {
                        setOpenPop("");
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    children={
                        currentUser?.role === "manager" ? "Assign" : "Submit"
                    }
                    onClick={
                        currentUser?.role === "manager"
                            ? AssignWorker
                            : handleSubmit
                    }
                />
            </div>
        </div>
    );
}
