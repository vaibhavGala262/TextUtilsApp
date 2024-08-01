import React,  {useState} from 'react'
import Navbar from './components/Navbar'
import TextForm from './components/TextForm'
import Alert from './components/Alert';
import Translate from './components/Translate';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';


export default function App() {

  
  const[mode , setmode]=useState('light');
  const[alert , setAlert]=useState(null);

  

  const showAlert=(message, type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }

  const toggleMode=()=>{
    if(mode==='dark'){
      setmode('light');
      document.body.style.backgroundColor='white' 
     
    
  }
    else{ 
    setmode('dark')
    console.log("Req dark mode")
    document.body.style.backgroundColor='#15202B'
    showAlert("Dark Mode Enabled","success")
  }
  }

  return (
    <>

  <Navbar title="textutils" mode ={mode} toggleMode={toggleMode}/>
  <Alert alert={alert}/>
  <div className="container"> 

  
  
  
<Routes>
  <Route path="/" element={<TextForm showAlert={showAlert} heading="TextArea" mode={mode} toggleMode={toggleMode} />}/>
  <Route path='/About' element={<About mode={mode}/>}/> 
  <Route path='/Translate' element={<Translate showAlert={showAlert}/>} ></Route>
  </Routes> 
  </div>

    </>
  )
}
