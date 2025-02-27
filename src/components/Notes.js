import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import { Noteitem } from './Noteitem';

export const Notes = () => {
    const { notes, fetchNotes } = useContext(NoteContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
        } else {
            navigate("/login");
        }
    }, []);
    
    return (
        <>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", width: "100%", textAlign: "center" }}>
                {notes.length === 0 && 'No notes to display. Please Add Some Notes ! '}
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />   //Noteitem naam ka card bnao tum , jitni entries aaye unte k liye
                       
            })}
            
            </div>
        </>
    );
}