import {useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => { 
    const host = "http://localhost:5000";
    const notesInitial =[ ]
    
    const [notes, setNotes] = useState(notesInitial);
    //Add notes
    const addNotes = async (title,description,tag) => {
        
        const note = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}),
        });
       
        setNotes(notes.concat(note));
     }

    //edit
    const editNote = async (id, title, description, tag) => {
        
        //Backend Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), 
        });
        
        const newnotes=JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < newnotes.length; i++) { 
            if (newnotes[i]._id === id) { 
                newnotes[i].title = title;
                newnotes[i].description = description;
                newnotes[i].tag = tag;
                break;
            }
        }
        setNotes(newnotes)
        const json = await response.json();
    }

    //Delete notes
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        
        
        const newNotes = notes.filter((note) => {return note._id !== id });
        setNotes(newNotes);
    }
    //Fetch All Notes
    const fetchNotes = async() => { 
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(),
        });
        const json=await response.json();
        
        setNotes(json);
    }

   
    return (
        <NoteContext.Provider value={{ notes, addNotes, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;