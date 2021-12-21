import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Chats() {
    const { authState } = useContext(AuthContext);
    const [listOfChats, setListOfChats] = useState([]);
    const [uniqueUIds, setuniqueUIds] = useState([]);
    let history = useNavigate();
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        axios.post("http://localhost:3001/message/getchats", { uid: authState.id }).then((res) => {
            setuniqueUIds(res.data);
            
        });

        uniqueUIds.forEach(e => {
            /*
            axios.post(`http://localhost:3001/auth/getusername`, { uid: e }).then((res) => {
                if (res.data) {
                    let tmpchats = listOfChats;
                    tmpchats.push({ uid: e, username: res.data.username });
                    setListOfChats(tmpchats);
                }
            });
            */
            let tmpchats = listOfChats;
            tmpchats.push({ uid: e, username: "" });
        });
        console.log("listOfChats");
    }, []);

    return (
        <div>
            <h1>Meine Chats</h1>
            <div className='pOverwievWrapper'>
                {uniqueUIds.map((value, key) => {
                    return (
                        <div
                            key={key}
                            className="profile"
                            onClick={() => { history(`/message/${value}`) }}
                        >
                            <div className="title"> {value} </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Chats
