import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { AuthContext } from "../App";
import { Formik, Form, Field } from "formik";
import { useParams, useNavigate } from 'react-router-dom';

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Message() {
    const forceUpdate = useForceUpdate();
    const { authState } = useContext(AuthContext);
    const [chat, setChat] = useState([]);
    const [otherUser, setotherUser] = useState({});
    let { id } = useParams();

    useEffect(() => {
        axios.post(`http://localhost:3001/message/getchat`, { senderId: authState.id, recipientId: id, }).then((res) => {
            if (res.data) {
                setChat(res.data)
            }
        });

        axios.post(`http://localhost:3001/auth/getusername`, { uid: id}).then((res) => {
            if (res.data) {
                setotherUser(res.data)
            }
        });
        forceUpdate();
    }, []);

    const initialValues = {
        message: ""
    };

    const onSubmit = (data, { resetForm }) => {
        const mData = {
            senderId: authState.id,
            recipientId: id,
            content: data.message
        }
        if (data.message) {
            axios.post('http://localhost:3001/message', mData).then((res) => {
                if (res.data.error) {
                    alert(res.data.error)
                }
                chat.push(res.data)
                forceUpdate();
            });
            resetForm(initialValues)
        }

    };

    return (
        <div>
            <h1>Chat mit {otherUser.username}</h1>
            <div className="scroll-bg">
                <div className="scroll-div">
                    {chat.map((value, key) => {
                        return (
                            <div
                                key={key}
                                className="scroll-object"
                            >
                                <div className="message">
                                {id == value.senderId && (
                                    <>
                                        <b>{otherUser.username}:</b>
                                    </>
                                )}
                                {authState.id == value.senderId && (
                                    <>
                                        <b>{authState.username}:</b>
                                    </>
                                )} {value.content}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form class="messageForm">
                    <Field class="messageField" name="message" />
                    <button type="submit"> Senden</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Message
