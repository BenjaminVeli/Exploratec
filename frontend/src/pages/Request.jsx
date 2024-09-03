import { useState, useEffect } from "react";
import api from "../api";

import HeaderAuth from "../components/Header-auth";
import Note from "../components/Note";

function Request(){
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };



    return (
        <div>
            <HeaderAuth />
            
            <div className="container">
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>

        </div>  
    );
}

export default Request;