import React, { useContext, useEffect } from 'react';
import NoteContext from "../context/notes/NoteContext";
import { FaUserPlus } from 'react-icons/fa';
import './AllUsers.css';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const { users, allusers, addToTeam } = useContext(NoteContext);
    console.log(users);
    
    useEffect(() => {
        allusers();
    }, []);

    const handleAddUserToTeam = (id,name,email,role) => {
        console.log(localStorage.getItem("role"));
        if(localStorage.getItem("role")==='admin'){
            addToTeam(id,name,email,role);
            toast.success(`${name} Joined the Team`);
        }
        else toast.error("you are not an admin");
    };

    return (
        <div className="container">
            {/* <h3 className="my-3">ALL USERS</h3> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Date</th>
                        <th scope="col">Add to Team</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.date).toLocaleString()}</td>
                            <td>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleAddUserToTeam(user._id,user.name,user.email,user.role)}
                                    title="Add to team"
                                >
                                    <FaUserPlus size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;
