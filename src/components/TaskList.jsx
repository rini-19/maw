import { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import Title from "./Title";
import axios from "axios";
import { apiUrl } from "../config";
import CustomTable from "../commons/Table";

import ViewTask from "./ViewTask";
import RowActions from "./RowActions";
import { useGlobalContext } from "../context";

export default function TaskList({list}) {
    const [tasks, setTasks] = useState([]);

    const { currentUser } = useGlobalContext();
    useEffect(() => {
        const url =
            currentUser.role === "worker"
                ? `${apiUrl}/viewTaskWorker?WID=${currentUser._id}`
                : `${apiUrl}/${list}?MID=${currentUser._id}`;
        axios.get(url).then((res) => {
            console.log(res.data);
            setTasks(res.data);
        });
    }, [currentUser, list]);
    const createData = (sno, date, name, status, action) => {
        return { sno, date, name, status, action };
    };
    const rows = tasks.map((task, index) =>
        createData(
            index + 1,
            task.CreatedAt,
            task.Heading,
            task.Status,
            <RowActions task={task} list={list} />
            // <Button
            //     variant="contained"
            //     color="primary"
            //     children="View Details"
            //     onClick={() => handleViewDetails(index)}
            // />
        )
    );
    const columns = [
        { id: "sno", label: "S.NO.", align: "center" },
        { id: "date", label: "Date", align: "center" },
        { id: "name", label: "Name", align: "center" },
        { id: "status", label: "Status", align: "center" },
        { id: "action", label: "Actions", align: "center" },
    ];
    return (
        <>
            <Title>Task List</Title>
            <CustomTable rows={rows} columns={columns} />
        </>
    );
}
