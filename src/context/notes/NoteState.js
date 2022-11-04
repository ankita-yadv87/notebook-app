import NoteContext from "./NoteContext";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";


const NoteState = (props) => {
    const host = "http://localhost:5000"

    // let navigate = useNavigate();

    // const s1 = {
    //     "name": "ankita",
    //     "class": "5b"
    // }

    // const [place, setPlace] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setPlace({
    //             "name": "anku",
    //             "class": "10b"
    //         })
    //     },1000);
    // }

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    //Get all notes
    const getNotes = async () => {

        //todo api call
       
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        setNotes(json);
    
    
    }



    //Add a note
    const addNote = async (title, description, tag) => {
        //todo api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note  = await response.json(); // parses JSON response into native JavaScript objects
        // setNotes(notes.push(note)); 
        setNotes(notes.concat(note)); //concat returns an  array whereas push updates an array
    }



    // Delete a note
    const deleteNote = async (id) => {
        //todo api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);
        console.log("deleting a node with id" + id);

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }



    //edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects


        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
          }
        }  
        setNotes(newNotes);
      }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;