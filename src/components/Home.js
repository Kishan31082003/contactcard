import react from 'react';
import { Notes } from "./Notes";
import { AddNote } from "./AddNote";

export const Home = () => { 
    return (
        <div>
            <header style={{paddingTop:"4rem"}}>
                <h2>YOUR CONTACT CARDS</h2>
                    <AddNote/>
                    <Notes />
            </header>
        </div>
    );
}