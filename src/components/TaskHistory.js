import { useState, useEffect } from "react";

import Title from "./Title";
import axios from "axios";
import { apiUrl } from "../config";
import CustomTable from "../commons/Table";


import { useGlobalContext } from "../context";

export default function TaskHistory() {
    const [tasks, setTasks] = useState([]);

    const { currentUser } = useGlobalContext();
    useEffect(() => {
        const url = `${apiUrl}/taskHistory?WID=${currentUser._id}`
        axios.get(url).then((res) => {
            console.log(res.data);
            setTasks(res.data);
        });
    }, [currentUser]);
    const createData = (sno, date, name, status) => {
        return { sno, date, name, status };
    };
    const rows = tasks.map((task, index) =>
        createData(
            index + 1,
            task.CreatedAt,
            task.Heading,
            task.Status,
            // <RowActions task={task} list={list} />
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
    ];
    return (
        <>
            <Title>Task History</Title>
            <CustomTable rows={rows} columns={columns} />
        </>
    );
}
