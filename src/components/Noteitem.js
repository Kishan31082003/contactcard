import { useState,useContext } from 'react';
import "./Noteitem.css"
import  NoteContext  from "../context/notes/NoteContext";
export const Noteitem = ({ note }) => {
    const context = useContext(NoteContext);
    const { deleteNote, editNote } = context;
    const [popup, setPopup] = useState("popup");
    const [newnote, setNewnote] = useState({ id: note._id, title: note.title, description: note.description, tag:note.tag });
    const popup2 = () => {
        setPopup([popup+" poped"]);
    }
    const popupremove = () => { 
        setPopup(["popup"]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Editing a note")
        console.log(newnote)
        editNote(newnote.id, newnote.title, newnote.description, newnote.tag);
        popupremove();
    }
    const handleChange = (e) => {
        e.preventDefault();
        setNewnote({ ...newnote, [e.target.name]: e.target.value })
    }
    return (
        <>
           <div className='card'>
                <p className='tag'>{note.tag}</p>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <i className="fa-solid fa-trash-can trash" onClick={() => { deleteNote(note._id) }}></i>
                <i className="fa-regular fa-pen-to-square edit" onClick={ popup2}></i>
                {/* editNote(editNote._id, note.title, note.description, note.tag); */}
            </div>
            <div className={`${popup}`}>
                <div className="heading">
                    <h5>Edit</h5>
                    <i className="fa-regular fa-circle-xmark" onClick={popupremove}></i>
                </div>
                <form >
                    <div className='popup_row1'>
                        <label >Title </label>
                        <input name="title" type="text" value={newnote.title} minLength={5} required onChange={handleChange} placeholder="Please enter title" />
                    </div> 
                    <div className='popup_row1'>
                        <label >Description </label>
                        <textarea name="description" rows={5} value={newnote.description} minLength={5} required onChange={handleChange} placeholder="Please enter description" />
                    </div> 
                    <div className='popup_row1'>
                        <label >Tag </label>
                        <input name="tag" type="text" value={newnote.tag} onChange={handleChange}  placeholder="Please enter tag" />
                    </div> 
                    <button type="submit" onClick={handleSubmit}>Edit</button>
                </form>
            </div>

            
        </>
    );
}