import { IconButton } from "@material-ui/core";
import { Assignment, Edit, Visibility } from "@material-ui/icons";
import React, { useState } from "react";

import Popup from "../commons/Popup";
import { useGlobalContext } from "../context";
import DetailedTask from "./DetailedTask";
import EditTask from "./EditTask";
import ReviewTask from "./ReviewTask"
export default function RowActions({ task, list }) {
    const classes = {};
    const [popupType, setPopupType] = useState("");
    const { currentUser } = useGlobalContext();

    const handleViewDetails = (index) => {
        setPopupType("View");
    };
    const handleEditTask = () => {
        setPopupType("Edit");
    };
    const handleReviewDetails = () => {
        setPopupType("Review")
    }
    return (
        <div className={classes.root}>
            {currentUser.role === "manager" ? (
                <>
                    {list=== 'viewTaskManager' ? 
                        <>
                            <IconButton
                                onClick={handleEditTask}
                                children={<Edit />}
                                color="primary"
                            />
                            <IconButton
                                onClick={handleViewDetails}
                                children={<Visibility />}
                                color="primary"
                            />
                        </> :
                        <IconButton
                            onClick={handleReviewDetails}
                            children={<Visibility />}
                            color="primary"
                        />
                    }
                </>
            ) : (
                <IconButton
                    onClick={handleViewDetails}
                    children={<Assignment />}
                    color="primary"
                />
            )}
            <Popup
                title={`${popupType}  Task Details`}
                openPopup={popupType.length}
                setOpenPopup={setPopupType}
                isClosable={true}
                content={
                    popupType === "Review" ? (
                        <ReviewTask taskDetails={task}/>
                    ) :
                    (popupType === "View" ? (
                        <DetailedTask
                            taskDetails={task}
                            setOpenPop={setPopupType}
                        />
                    ) : (
                        <EditTask
                            taskDetails={task}
                            setOpenPop={setPopupType}
                        />
                    ))
                }
            />
        </div>
    );
}
