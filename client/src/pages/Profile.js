import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../App";

function Profile() {
    const { authState } = useContext(AuthContext);
    let { id } = useParams();
    const [profileObj, setProfileObj] = useState({});
    const [profileImg, setProfileImg] = useState({});
    let history = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/profile/byid/${id}`).then((res) => {
            setProfileObj(res.data);
            setProfileImg(require("../images/" + res.data.profileImg).default)
        });
    }, []);

    return (
        <div className="profilePage">
            <div className='profileTop'>
                <div className='profilePic'>
                    <img src={profileImg} alt='profile pic'></img>
                </div>
                <div className='animalData'>
                    <div><b>Name:</b> {profileObj.name}</div>
                    <div><b>Spezies:</b> {profileObj.species}</div>
                    <div><b>Alter:</b> {profileObj.age}</div>
                    <div><b>Gemuet:</b> {profileObj.disposition}</div>
                </div>
                {(authState.id == profileObj.UserId) && (
                    <>
                        <button onClick={() => history(`/profile/${id}/edit`)}> Profil Bearbeiten</button>
                    </>
                )}
            </div>
            <div className='profileMiddle'>
                <h3>Beschreibung:</h3>
                <div>{profileObj.description}</div>
            </div>
        </div>
    )
}

export default Profile
