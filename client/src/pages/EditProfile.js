import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../App";
import { Formik, Form, Field } from "formik";


function EditProfile() {
    const { authState } = useContext(AuthContext);
    let { id } = useParams();
    const [profileObj, setProfileObj] = useState({});
    const [profileImg, setProfileImg] = useState({});
    let history = useNavigate();
    const tmp = { profileImage: null };

    useEffect(() => {
        axios.get(`http://localhost:3001/profile/byid/${id}`).then((res) => {
            setProfileObj(res.data);
            setProfileImg(require("../images/" + res.data.profileImg).default)
        });
    }, []);


    let initialValues = {
        language: profileObj.language,
        description: profileObj.description,
        name: profileObj.name,
        species: profileObj.species,
        type: profileObj.type,
        age: profileObj.age,
        UserId: profileObj.UserId,
        disposition: profileObj.disposition,
    };

    const onSubmit = (data) => {
        axios.post(`http://localhost:3001/profile/${id}/edit`, data).then((res) => {
            
        });
        if(tmp.profileImage){
            console.log("new pp")
            const fd = new FormData();
            fd.append('image', tmp.profileImage, tmp.profileImage.name)
            fd.append('pid', id)

            axios.post("http://localhost:3001/profile/uploadprofilepic", fd).then((res) => {
                
            });
        }
    };

    let fileSelectedHandler = event => {
        tmp.profileImage = event.target.files[0]
    };

    return (
        <div className="editProfilePage">
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form className="formContainer">
                    <h2>Profil Bearbeiten</h2>
                    <label> Name</label>
                    <Field name="name"/>

                    <label> Beschreibung</label>
                    <Field name="description" as="textarea"/>

                    <label> Art</label>
                    <Field name="species" as="select">
                        <option value="Hund"> Hund</option>
                        <option value="Katze"> Katze</option>
                        <option value="Meerschweinchen"> Meerschweinchen</option>
                        <option value="Hamster"> Hamster</option>
                        <option value="Kaninchen"> Kaninchen</option>
                    </Field>

                    <label> Alter</label>
                    <Field name="age"/>

                    <label> Gemüt</label>
                    <Field name="disposition" as="select">
                        <option value="Ruhig"> Ruhig</option>
                        <option value="Aktiv"> Aktiv</option>
                        <option value="Schüchtern"> Schüchtern</option>
                        <option value="Ängstlich"> Ängstlich</option>
                        <option value="Dominant"> Dominant</option>
                    </Field>

                    <label>Aktuelles Profilbild</label>
                    <div className='currentPic'>
                        <img src={profileImg} alt='profile pic'></img>
                    </div>

                    <label> Profilbild ändern</label>
                    <input type="file" name="profileImage" onChange={fileSelectedHandler} />
                    <button type="submit"> Profil bearbeiten</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EditProfile
