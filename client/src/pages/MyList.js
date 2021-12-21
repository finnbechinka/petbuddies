import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function MyList() {
    const { authState } = useContext(AuthContext);
    const [listOfProfiles, setListOfProfiles] = useState([]);
    const [listOfImages, setListOfImages] = useState([]);
    const [profileImg, setProfileImg] = useState({});
    let history = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:3001/profile/mylist", { userid: authState.id }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setListOfProfiles(response.data);
                axios.get(`http://localhost:3001/image/`).then((res) => {
                    setListOfImages(res.data)
                });
            }
        });
    }, []);

    return (
        <div>
            <h1>Meine buddie Liste</h1>
            <div className='pOverwievWrapper'>
                {listOfProfiles.map((value, key) => {
                    return (
                        <div
                            key={key}
                            className="profile"
                            onClick={() => { history(`/profile/${value.id}`) }}
                        >
                            <div className="title"> {value.name} </div>
                            <div className="body">
                                <img className="img" src={require("../images/" + value.profileImg).default} alt='profile pic'></img>
                            </div>
                            <div className="footer">{value.species}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default MyList
