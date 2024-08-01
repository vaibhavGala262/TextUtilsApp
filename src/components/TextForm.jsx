import React, { useState } from 'react'


export default function TextForm(props) {

    const [curText , setText]=useState("Enter Text Here");
    const[fontStyle, setFontStyle]=useState("cursive");

    const toUpperCase=()=>{
        let newText=curText.toUpperCase()
        setText(newText);
        props.showAlert("Converted To UpperCase!" , "success")
        }

    const toLowerCase=()=>{
        let newText=curText.toLowerCase();
        setText(newText)
        props.showAlert('Converted to LowerCase!' , 'success')
    }

    const handleChange=(e)=>{
        setText(e.target.value)
    }
    
    const clearText=()=>{
        setText("");
        props.showAlert("Text Cleared!" , "success")
    }

    const changeFontStyle=(id)=>{
        setFontStyle(()=>id)
    }
    const copyToClipBoard=()=>{
        
        navigator.clipboard.writeText(curText)
        .then((x)=>{
            console.log(x);
        })
        props.showAlert('Copied to ClipBoard!' , 'success')
    }

    const reverseText=()=>{
      if (curText !== undefined && curText !== null) {
        let newText = curText.split('').reverse().join('');
        setText(newText);
        props.showAlert("Text Reversed!" , "success")
      } else {
        setText(''); // Or handle as needed
      }
    }

    const removeSpace=()=>{
      let newText=curText.replace(/ +/g, ' ');
      setText(newText);
      props.showAlert("Extra Spaces Removed!" , "success")
    } 


    const capitalize=()=>{
      if (curText !== null && curText !== undefined) {
        let words = curText.split(' ').filter(word => word !== '');
        let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        let newText = capitalizedWords.join(' ');
        setText(newText);
        props.showAlert("Text Capitalized!" , "success")
    }
   
    }
    let flag=true;
    const speakText = () => {
     
      const utterance = new SpeechSynthesisUtterance(curText);
      utterance.lang = 'en-US'; // Set the language
      utterance.pitch = 1; // Set the pitch (0 to 2)
      utterance.rate = 1; // Set the rate (0.1 to 10)
      utterance.volume = 1; // Set the volume (0 to 1)
      
      
      const voices = speechSynthesis.getVoices();
      console.log(voices)
      utterance.voice=voices[2];


      if(flag)speechSynthesis.speak(utterance)
      else speechSynthesis.cancel();
    flag=!flag;

    props.showAlert("Speaking!" , "success")
    };

    const downloadText = () => {
      const element = document.createElement("a");
      const file = new Blob([curText], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "text.txt";
     // document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      props.showAlert("Downloading file!" , "success")
  };

  const darkBlueButtonStyle = {
    backgroundColor: '#00008B', // Dark blue color
    color: '#fff', // White text color
    padding: '10px 20px', // Padding for the button
    fontSize: '16px', // Font size
    border: 'none', // No border
    borderRadius: '8px', // Slightly rounded borders
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  };
  
  // Usage in JSX
  
  const flexContainerStyle = {
    display: 'flex',
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space between heading and button
  };

  return (
    <div>

    <div  style={flexContainerStyle}>
    <h1 style={{color:props.mode==='dark'?'white':'black'}}>Enter Text Below</h1>

    
  <div class="dropdown my-2 mx-4"   >
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Font Family
  </a>

  <ul class="dropdown-menu">
    <li><a  class="dropdown-item" href="#" ></a></li>
    
    <li><a class="dropdown-item" id="cursive" href="#"onClick={()=>changeFontStyle("cursive")}>Cursive</a></li>
    <li><a class="dropdown-item" id="revert" href="#"onClick={()=>changeFontStyle("revert")}>Revert</a></li>
    <li><a class="dropdown-item" id="fantasy" href="#"onClick={()=>changeFontStyle("fantasy")}>Fantasy</a></li>
    <li><a class="dropdown-item" id="sans-serif" href="#"onClick={()=>changeFontStyle("sans-serif")}>Sans Serif</a></li>
    <li><a class="dropdown-item" id="monospace" href="#"onClick={()=>changeFontStyle("monospace")}>MonoSpace</a></li>

  </ul>

</div>
    </div>

  <div className="mb-3">
  
    <textarea
      className="form-control"
      id="exampleFormControlTextarea1"
      rows={8}
      defaultValue=""
      value={curText}
     onChange={handleChange}
     style={{
         fontFamily:fontStyle, 
         backgroundColor:props.mode==='dark'?'#00455e':'white',
         color: props.mode==='dark'?'white':'black'
        }} 
    
  
        
    />
    </div>

 
 <button disabled={curText.length==0}     id="convertToUpperCase"  className='mx-2'onClick={toUpperCase}> Convert to upperCase </button>
  <button disabled={curText.length==0}   id="convertToLowerCase"className='mx-2' onClick={toLowerCase}> Convert to lowerCase </button>
  <button disabled={curText.length==0}    id="clear" className='mx-2' onClick ={clearText}>Clear</button>
  <button disabled={curText.length==0}     id="copy" className='mx-2' onClick={copyToClipBoard}>Copy</button>
  <button disabled={curText.length==0}    id="reverseText" className='mx-2' onClick={reverseText}>Reverse Text</button>
  <button disabled={curText.length==0}     id="removeSpace" className='mx-2' onClick={removeSpace}>Remove Spaces</button>
  <button disabled={curText.length==0}     id="capitalize" className='mx-2' onClick={capitalize}>Capitalize</button>
  <button disabled={curText.length==0}    id="speak" className='mx-2' onClick={speakText}>Speak Text</button>
  <button disabled={curText.length==0}   id="downloadText" className='mx-2' onClick={downloadText}>Download Text</button>
 
  


  <div className="container my-3 " style={{ color:props.mode==='dark'?'white':'black'}}>
      <h3>Your Text Summary</h3>
    <p> Total Characters:{curText.length} , Total words:{curText.split(" ").filter((ele)=>ele!="").length}</p>
  </div>

    </div>
     )}
  
