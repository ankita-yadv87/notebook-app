import React from 'react'
import Notes from './Notes';

const Home = (props) => {
  const {showAlert} = props;
  return (
    <>

      <div className='container my-3'>
        <Notes mode={props.mode} showAlert={showAlert}/>
      </div>

    </>
  )
}

export default Home