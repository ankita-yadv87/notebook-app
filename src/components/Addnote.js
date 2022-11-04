import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault(); //to prevent from page reloding
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note has been successfullly added", "success");
        setNote({ title: "", description: "", tag: "" })
        
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value, [e.target.tag]: e.target.value })
    }

    return (
        <div className="container my-3" style={{backgroundColor: props.mode === 'dark'? "#05152c" : "white" , color: props.mode === 'dark'? 'white': 'black', border: "1px solid"} }>
            <div className="container my-4"> <h2>Add a note </h2></div>
           
            <form className="container my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" style={{backgroundColor: props.mode === 'dark'? "#05152c" : "white" , color: props.mode === 'dark'? 'white': 'black'} } id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={4} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" style={{backgroundColor: props.mode === 'dark'? "#05152c" : "white" , color: props.mode === 'dark'? 'white': 'black'} } id="description" name='description' value={note.description} onChange={onChange} minLength={4} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" style={{backgroundColor: props.mode === 'dark'? "#05152c" : "white" , color: props.mode === 'dark'? 'white': 'black'} } id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<4 || note.description.length<4 } type="submit" className="btn btn-primary" onClick={handleClick}>ADD NOTE</button>
            </form>
        </div>
    )
}

export default AddNote