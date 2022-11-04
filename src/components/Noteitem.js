import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'


const Noteitem = (props) => {

    const { note, updateNote } = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;

    
    return (

        <div className="col-md-3">

            <div className="card my-3" style={{backgroundColor: props.mode === 'dark'? "#05152c" : "white" , color: props.mode === 'dark'? 'white': 'black', border: "1px solid"} }>
                <div className="card-body ">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className='far fa-trash-alt mx-2' onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                        <i className='far fa-edit mx-2' onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text"> {note.tag}</p>

                    <p className="card-text"> {note.description}</p>
                    

                </div>
            </div>

        </div>
    )
}

export default Noteitem