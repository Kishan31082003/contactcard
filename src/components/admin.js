import react,{useContext,useEffect} from 'react';
import { Notes } from "./Notes";

import NoteContext from "../context/notes/NoteContext";


export const Admin = () => { 
    const { fetchAllNotes } = useContext(NoteContext);
    useEffect(()=>{
        fetchAllNotes();
    },[])

    


    return (
        <div>
            <header style={{paddingTop:"4rem"}}>
                <h3 >ALL CARDS WITHIN TEAM</h3>
                <Notes />
            </header>
        </div>
    );
}

//fetchNotes();