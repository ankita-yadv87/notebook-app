import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState('light');

  const toggleMode =()=>{
    if (mode === 'light') {
      document.body.style.backgroundColor=" rgb(16 5 44)";
      setMode('dark');
      showAlert("Dark mode has been enabled", "success")
    }
    else{
      document.body.style.backgroundColor="white";
      setMode('light');
      showAlert("Light mode has been enabled", "success")
    }
  }

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };


  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar mode={mode} toggleMode={toggleMode}/>
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home  mode={mode} showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route exact path="/login" element={<Login mode={mode} showAlert={showAlert} />} />
            <Route exact path="/signup" element={<SignUp mode={mode} showAlert={showAlert} />} />
          </Routes>

        </BrowserRouter>
      </NoteState>


    </>

  );
}

export default App;
