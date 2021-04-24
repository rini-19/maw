import React, {useState, useEffect} from "react";
import CustomTable from "../commons/Table";
import { MenuItem, TextField, Button } from "@material-ui/core";

import axios from "axios";
import { apiUrl } from "../config";

const details = [
    { label: "Heading", field: "Heading" },
    { label: "Description", field: "Description" },
    { label: "Heading", field: "Durjj" },
    { label: "Heading", field: "Heading" },
    { label: "Heading", field: "Heading" },
];
export default function ReviewTask({ taskDetails }) {
    const [workers, setWorkers] = useState([]);
    const [isWorkersLoading, setIsWorkersLoading] = useState(false);
    const [assignedWorker, setAssignedWorker] = useState('');

    const classes = {};
    const columns = [
        { id: "field", label: "" },
        { id: "value", label: "" },
    ];
    // useEffect(() => {
    //     setIsWorkersLoading(true);
    //     axios
    //         .get(`${apiUrl}/getWorkers`)
    //         .then((res) => {
    //             setWorkers(res.data);
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setIsWorkersLoading(false));
    // }, []);
    
    const UpdateTaskReview = (Review) =>{
        console.log('in function')
        axios({
            method: 'post',
            url: `${apiUrl}/updateReview`,
            data: {
                TID: taskDetails._id,
                Review
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }
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
        createData("Task Content", taskDetails.ContentTxt),
        createData("Total Points", taskDetails.TotalPoints),
        
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
                    children="Reject"
                    onClick={UpdateTaskReview('Reject')}
                />
                <Button variant="contained" color="primary" children="Accept" onClick={UpdateTaskReview('Accept')}/>
            </div>
        </div>
    );
}

