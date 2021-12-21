import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { AuthContext } from "../App";
import { Formik, Form, Field } from "formik";
//import { TextField , Input} from "@material-ui/core"
//import { Input } from "reactstrap"

function CreateProfile() {
    const { authState } = useContext(AuthContext);
    const tmp = { profileImage: null };

    const initialValues = {
        language: "german",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia ex a quam dictum tincidunt. Sed malesuada tellus ut faucibus elementum. Aenean laoreet arcu sit amet tincidunt luctus. Nullam rhoncus velit nec venenatis malesuada. Mauris id commodo sapien. In et tellus a velit facilisis mollis at quis mauris. Ut faucibus ac turpis non suscipit. Etiam sit amet velit et turpis pulvinar sodales. Fusce odio nisl, vestibulum sed enim at, finibus volutpat nisi. Praesent lacinia auctor ex id bibendum. Vestibulum turpis odio, molestie quis tristique ut, congue eu ipsum. ",
        name: "",
        species: "Hund",
        type: "",
        age: 0,
        UserId: authState.id,
        disposition: "Ruhig",
    };

    const onSubmit = (data) => {

        axios.post("http://localhost:3001/profile/create", data).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            } else {
                let pid = res.data.id;

                const fd = new FormData();
                fd.append('image', tmp.profileImage, tmp.profileImage.name)
                fd.append('pid', pid)

                axios.post("http://localhost:3001/profile/uploadprofilepic", fd).then((res) => {
                    if (res.data.error) {
                        alert(res.data.error);
                    }
                });
            }
        });
    };

    let fileSelectedHandler = event => {
        tmp.profileImage = event.target.files[0]
    };

    return (
        <div>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    <Form className="formContainer">
                        <label> Name</label>
                        <Field name="name" />

                        <label> Beschreibung</label>
                        <Field name="description" as="textarea" />

                        <label> Art</label>
                        <Field name="species" as="select">
                            <option value="Hund"> Hund</option>
                            <option value="Katze"> Katze</option>
                            <option value="Meerschweinchen"> Meerschweinchen</option>
                            <option value="Hamster"> Hamster</option>
                            <option value="Kaninchen"> Kaninchen</option>
                        </Field>

                        <label> Alter</label>
                        <Field name="age" />

                        <label> Gemüt</label>
                        <Field name="disposition" as="select">
                            <option value="Ruhig"> Ruhig</option>
                            <option value="Aktiv"> Aktiv</option>
                            <option value="Schüchtern"> Schüchtern</option>
                            <option value="Ängstlich"> Ängstlich</option>
                            <option value="Dominant"> Dominant</option>
                        </Field>

                        <label> Profilbild auswählen</label>
                        <input type="file" name="profileImage" onChange={fileSelectedHandler} />
                        <button type="submit"> Profil erstellen</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default CreateProfile
