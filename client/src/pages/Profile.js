import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../App";

function Profile() {
    const { authState } = useContext(AuthContext);
    let { id } = useParams();
    const [profileObj, setProfileObj] = useState({});
    let history = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/profile/byid/${id}`).then((res) => {
            setProfileObj(res.data);
        });
    }, []);

    return (
        <div className="profilePage">
            <div className='profileTop'>
                <div className='profilePic'>
                    <img src="https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559_960_720.jpg" alt='profile pic'></img>
                </div>
                <div className='animalData'>
                    <div><b>Name:</b> {profileObj.name}</div>
                    <div><b>Spezies:</b> {profileObj.species}</div>
                    <div><b>Typ:</b> {profileObj.type}</div>
                    <div><b>Alter:</b> {profileObj.age}</div>
                    <div><b>Gemuet:</b> {profileObj.disposition}</div>
                </div>
                {(authState.id == profileObj.UserId) && (
                    <>
                        <button onClick={() => history("/")}> Profil Bearbeiten</button>
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
