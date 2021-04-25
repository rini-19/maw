import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import CustomTable from "../commons/Table";
import { useGlobalContext } from "../context";
import { apiUrl } from "../config";

export default function UserProfile({ setOpenPop }) {
    const classes = {};
    const { currentUser } = useGlobalContext();
    const [userDetails, setUserDetails] = useState({ Name: "", Email: "" });
    const [isEditing, setIsEditing] = useState(false);
    const columns = [
        { id: "field", label: "" },
        { id: "value", label: "" },
    ];
    const createData = (field, value) => {
        return { field, value };
    };

    const handleSubmit = () => {
        axios({
            method: 'patch',
            url: `${apiUrl}/editProfile/${currentUser._id}`,
            data: {
                userDetails
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };
    const handleEdit = () => {
        setIsEditing(true);
        setUserDetails({ Name: currentUser.Name, Email: currentUser.Email });
    };
    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({ ...prevState, [name]: value }));
    };
    const generateRows = () => {
        return [
            createData("User ID", currentUser._id),
            createData("Role", currentUser.role),
            !isEditing
                ? createData("Name", currentUser.Name?.toUpperCase())
                : createData(
                      "Name",
                      <TextField
                          name="Name"
                          value={userDetails.Name}
                          onChange={handleUserDetailsChange}
                      />
                  ),
            !isEditing
                ? createData("Email", currentUser.Email)
                : createData(
                      "Email",
                      <TextField
                          name="Email"
                          value={userDetails.Email}
                          onChange={handleUserDetailsChange}
                      />
                  ),
                  createData("Rewards", currentUser.Reward),
        ];
    };
    return (
        <div className={classes.root}>
            <CustomTable
                rows={generateRows()}
                columns={columns}
                showTableHead={false}
            />
            <div
                style={{
                    display: "flex",
                    padding: "1em 0 0",
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    children={isEditing ? "Save" : "Edit"}
                    onClick={isEditing ? handleSubmit : handleEdit}
                />
            </div>
        </div>
    );
}
