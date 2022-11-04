import React, { useContext, useEffect } from 'react'
import NoteContext from "../context/notes/NoteContext";

const About = (props) => {

  // const a = useContext(NoteContext)
  // useEffect(() => {
  //   a.update()
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className='container my-4' style={{backgroundColor: props.mode === 'dark'? "#05152c" : "white", color: props.mode === 'dark'? 'white': 'black'}}> 
    <h2>This is About page</h2>
    </div>
  )
}

export default About;