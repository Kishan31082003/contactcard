import {useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => { 
    const host = "http://localhost:5000";
    const notesInitial =[ ]
    const usersInitial =[ ]
    const teamsInitial =[ ]
    const allteamsInitial = [ ]
    
    const [notes, setNotes] = useState(notesInitial);
    const [users, setUsers] = useState(usersInitial);
    const [teams, setTeams] = useState(teamsInitial); //ye post k liye
    const [allteams, setAllTeams] = useState(allteamsInitial); //ye get k liye
    const [allgrpcontacts, setAllGrpContacts] = useState(allteamsInitial); //ye get k liye to get all cards of group members
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


    // admin fetchall
    const fetchAllNotes = async() => { 
        
        const response = await fetch(`${host}/api/admin/allnotes`, {
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


    // totalusers fetching 
    const allusers = async() => { 
        
        const response = await fetch(`${host}/api/allusers/allusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(),
        });

        const json=await response.json();
        console.log(json);
        
        setUsers(json);
    }


    //adding a user from all users to my team ;
    const addToTeam = async(name, email,role) => { 
        const response = await fetch(`${host}/api/team/myteam`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({name, email,role}),
        });

        const json=await response.json();
        console.log(json);
        
        setTeams(json);
    }

    //fetching all teams
    const getAllTeams = async() => { 
        
        const response = await fetch(`${host}/api/team/showteam`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(),
        });

        const json=await response.json();
        console.log(json);
        
        setAllTeams(json);
    }

    //feching all of card/notes of a given user with id
    const addTheirContacts = async (id) => {
        const response = await fetch(`${host}/api/notes/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        
        
        const newNotes = notes.filter((note) => {return note._id == id });
        setNotes(newNotes);
    }






   
    return (
        <NoteContext.Provider value={{ notes,addNotes, deleteNote, editNote, fetchNotes, fetchAllNotes, users, allusers,addToTeam, teams, setTeams, allteams, getAllTeams, allteamsInitial, addTheirContacts, setAllGrpContacts }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;