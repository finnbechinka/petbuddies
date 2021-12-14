import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function ProfileOverview() {
    const { authState, setAuthState } = useContext(AuthContext);
    const [listOfProfiles, setListOfProfiles] = useState([]);
    let history = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:3001/profile/getmyprofiles", { id: authState.id }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setListOfProfiles(response.data);
            }
        });
    }, []);

    return (
        <div>
            {listOfProfiles.map((value, key) => {
                return (
                    <div
                        className="post"
                    >
                        <div className="title"> {value.language} </div>
                        <div className="body">{value.description}</div>
                        <div className="footer">{value.type}</div>
                    </div>
                );
            })}
        </div>
    )
}

export default ProfileOverview
