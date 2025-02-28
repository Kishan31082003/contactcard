import React, { useContext, useEffect } from 'react';
import NoteContext from "../context/notes/NoteContext";
//import { FaUserPlus } from 'react-icons/fa';
import './AllUsers.css';

const Myteam = () => {
    const { allteams, getAllTeams } = useContext(NoteContext);
    console.log(allteams);
    
    useEffect(() => {
        getAllTeams();
    }, []);

    const showTheirContacts = (userId) => {
        //addTheirContacts(userId);
    };

    return (
        <div className="container">
            <h2 className="my-3">YOUR TEAM USERS</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Joined</th>
                        {/* <th scope="col">Add to Team</th> */}
                    </tr>
                </thead>
                <tbody>
                    {allteams.map((user) => (
                        <tr key={user._id}>
                            <td onClick={() => showTheirContacts(user._id)}>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.date).toLocaleString()}</td>
                            {/* <td>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => showTheirContacts(user._id)}
                                    title="Add to team"
                                >
                                    <FaUserPlus size={20} />
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Myteam;
