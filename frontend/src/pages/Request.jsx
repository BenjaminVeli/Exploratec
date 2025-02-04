import { useState, useEffect } from "react";
import api from "../api";

import Header from "../components/Header";
import Note from "../components/Note";

const Request = () =>{
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/note-list/")
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
                if (res.status === 204) alert("La solicitud fue eliminada correctamente.");
                else alert("Hubo un error al eliminar la solicitud.");
                getNotes();
            })
            .catch((error) => alert(error));
    };



    return (
        <div>
            <Header />
                    
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}

        </div>  
    );
}

export default Request;