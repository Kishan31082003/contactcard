import { useState, useContext } from 'react';
import "./Noteitem.css";
import NoteContext from "../context/notes/NoteContext";

export const Noteitem = ({ note }) => {
    const context = useContext(NoteContext);
    const { deleteNote, editNote } = context;

    const [popup, setPopup] = useState("popup");
    const [newnote, setNewnote] = useState({
        id: note._id,
        Name: note.Name,
        Email: note.Email,
        Mobile: note.Mobile,
        Address: note.Address
    });

    const popup2 = () => {
        setPopup([popup + " poped"]);
    };

    const popupremove = () => {
        setPopup(["popup"]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Editing a note");
        console.log(newnote);
        editNote(newnote.id, newnote.Name, newnote.Email, newnote.Mobile, newnote.Address);
        popupremove();
    };

    const handleChange = (e) => {
        e.preventDefault();
        setNewnote({ ...newnote, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='card'>
                <p className='tag'>{note.address}</p>
                <h3>{note.Name}</h3>
                <p>{note.Email}</p>
                <p>{note.Mobile}</p>
                <p>{note.Address}</p>
                <i className="fa-solid fa-trash-can trash" onClick={() => { deleteNote(note._id) }}></i>
                <i className="fa-regular fa-pen-to-square edit" onClick={popup2}></i>
            </div>

            <div className={`${popup}`}>
                <div className="heading">
                    <h5>Edit</h5>
                    <i className="fa-regular fa-circle-xmark" onClick={popupremove}></i>
                </div>
                <form>
                    <div className='popup_row1'>
                        <label>Name</label>
                        <input
                            name="Name"
                            type="text"
                            value={newnote.Name}
                            minLength={3}
                            required
                            onChange={handleChange}
                            placeholder="Please enter name"
                        />
                    </div>

                    <div className='popup_row1'>
                        <label>Email</label>
                        <input
                            name="Email"
                            type="email"
                            value={newnote.Email}
                            required
                            onChange={handleChange}
                            placeholder="Please enter email"
                        />
                    </div>

                    <div className='popup_row1'>
                        <label>Mobile</label>
                        <input
                            name="Mobile"
                            type="text"
                            value={newnote.Mobile}
                            required
                            onChange={handleChange}
                            placeholder="Please enter mobile number"
                        />
                    </div>

                    <div className='popup_row1'>
                        <label>Address</label>
                        <input
                            name="Address"
                            type="text"
                            value={newnote.Address}
                            required
                            onChange={handleChange}
                            placeholder="Please enter address"
                        />
                    </div>

                    <button type="submit" onClick={handleSubmit}>UPDATE</button>
                </form>
            </div>
        </>
    );
};
