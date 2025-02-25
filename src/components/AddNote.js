import react, { useState, useContext } from 'react';
import "./AddNote.css";

import NoteContext from "../context/notes/NoteContext";
export const AddNote = () => {
    const { notes, addNotes,fetchNotes } = useContext(NoteContext);
    const [note, setNote] = useState({title: "",description:"",tag:""});
    const handleClick = () => {
        addNotes(note.title, note.description, note.tag);
        setNote({title: "",description:"",tag:""});
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
                    <label>Title</label>
                    <input type="text" name="title" minLength={5} required value={note.title} placeholder='Enter title' onChange={onChange} />
                </div>
                <div className='row'>
                    <label>Description</label>
                    <textarea type="textarea" name="description" minLength={5} required value={note.description }placeholder='Enter description'  rows={4} onChange={onChange} /></div>
                <div className='row'>
                    <label>Tag</label>
                    <input type="text" name="tag"  value={note.tag} placeholder='Enter tag' onChange={onChange} />
                </div>
            </form>
            <button onClick={handleClick}>Add Note</button>
        </div>
    );
}