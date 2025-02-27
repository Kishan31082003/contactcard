import react, { useState, useContext } from 'react';
import "./AddNote.css";

import NoteContext from "../context/notes/NoteContext";
export const AddNote = () => {
    const {  addNotes,fetchNotes } = useContext(NoteContext);
    const [note, setNote] = useState({Name: "",Email:"",Mobile:"",Address:""});
    const handleClick = () => {
        addNotes(note.Name, note.Email, note.Mobile, note.Address);
        setNote({Name: "",Email:"",Mobile:"",Address:""});
        fetchNotes();
    }
    const onChange = (e) => {
        e.preventDefault();
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='form_container'>
            <form className='form_body'>
                <div className='row'>
                    <label>Name</label>
                    <input type="text" name="Name" minLength={5} required value={note.Name} placeholder='Your name' onChange={onChange} />
                </div>
                <div className='row'>
                    <label>Email</label>
                    <input type="text" name="Email" minLength={5} required value={note.Email} placeholder='Your Email' onChange={onChange} />
                </div>
                <div className='row'>
                    <label>Mobile</label>
                    <input type="text" name="Mobile"  value={note.Mobile} placeholder='+91 3218731385' onChange={onChange} />
                </div>
                <div className='row'>
                    <label>Address</label>
                    <input type="text" name="Address"  value={note.Address} placeholder='city' onChange={onChange} />
                </div>
            </form>
            <button onClick={handleClick}>Create New</button>
        </div>
    );
}