import {useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => { 
    const host = "http://localhost:5000";
    const notesInitial =[ ]
    
    const [notes, setNotes] = useState(notesInitial);
    //Add notes
    const addNotes = async (Name, Email, Mobile, Address) => {
        
        const note = await fetch(`${host}/api/notes/addnote`, {   //ye wahi note h, jo notes db ka obj ne return kiya h apne ko
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({Name, Email, Mobile, Address}),
        });
        
        setNotes(notes.concat(note));
     }

    //edit
    const editNote = async (id, Name, Email, Mobile, Address) => {
        console.log(id);
        //Backend Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({Name, Email, Mobile, Address }), 
        });
        
        const newnotes=JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < newnotes.length; i++) { 
            if (newnotes[i]._id === id) { 
                newnotes[i].Name = Name;
                newnotes[i].Email = Email;
                newnotes[i].Mobile = Mobile;
                newnotes[i].Address = Address;
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
        console.log(json);
        
        setNotes(json);
    }

   
    return (
        <NoteContext.Provider value={{ notes, addNotes, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;