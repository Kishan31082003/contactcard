import react from 'react';
import { Notes } from "./Notes";
import { AddNote } from "./AddNote";

export const Home = () => { 
    return (
        <div>
            <header style={{paddingTop:"4rem"}}>
                <h1>Add Your Notes are here </h1>
                    <AddNote/>
                    <Notes />
            </header>
        </div>
    );
}