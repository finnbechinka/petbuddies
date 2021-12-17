import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function ProfileOverview() {
    const { authState } = useContext(AuthContext);
    const [listOfProfiles, setListOfProfiles] = useState([]);
    let history = useNavigate();

    useEffect(() => {
        console.log(authState.id);

        axios.post("http://localhost:3001/profile/myprofiles", { userid: authState.id }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setListOfProfiles(response.data);
            }
        });
    }, []);

    return (
        <div className='pOverwievWrapper'>
            {listOfProfiles.map((value, key) => {
                return (
                    <div
                        className="profile"
                        onClick={() => { history(`/profile/${value.id}`) }}
                    >
                        <div className="title"> {value.name} </div>
                        <div className="body">
                            <img src="https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559_960_720.jpg" alt='profile pic'></img>
                        </div>
                        <div className="footer">{value.species}</div>
                    </div>
                );
            })}
        </div>
    )
}

export default ProfileOverview
