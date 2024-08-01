import React, { useEffect, useState } from 'react';
import countries from './Data';

export default function Translate(props) {
  const [curText, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [voices, setVoices] = useState([]);
  
  const [fromLang, setFromLang] = useState('en-GB');
  const [toLang, setToLang] = useState('hi-IN');

  useEffect(() => {
    // Update language options
    const selectTags = document.querySelectorAll('select');
    selectTags.forEach((tag, id) => {
      for (let country_code in countries) {
        const selected = (id === 0 && country_code === fromLang) || (id === 1 && country_code === toLang) ? 'selected' : '';
        const option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
      }
    });

    // Get available voices
    const handleVoicesChanged = () => {
      const voices = speechSynthesis.getVoices();
      setVoices(voices);
    };

    handleVoicesChanged();
    speechSynthesis.onvoiceschanged = handleVoicesChanged;

  }, [fromLang, toLang]);

  const exchange = () => {
    setText(translatedText);
   setTranslatedText(curText);
    setFromLang(toLang);
    setToLang(fromLang);
  };

  const translate = () => {
    if (!curText.trim()) return;

    document.querySelector('.translatedText').setAttribute('placeholder', 'Translating');

    const url = `https://api.mymemory.translated.net/get?q=${curText}&langpair=${fromLang}|${toLang}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setTranslatedText(data.responseData.translatedText))
      .finally(() => document.querySelector('.translatedText').setAttribute('placeholder', 'Translation'));
  };

  const copyText = (e) => {
    navigator.clipboard.writeText(e.target.id === 'from' ? curText : translatedText);
    props.showAlert('Copied to Clipboard', 'success');
  };

  const speakText = (e) => {
    const text = e.target.id === 'from' ? curText : translatedText;
    const lang = e.target.id === 'from' ? fromLang : toLang;

    const sound = new SpeechSynthesisUtterance(text);
    sound.lang = lang;
    const voice = voices.find(v => v.lang === lang);
    if (voice) sound.voice = voice;

    speechSynthesis.speak(sound);
    props.showAlert(`Speaking ${e.target.id === 'from' ? 'Original' : 'Translated'} Text...`, 'success');
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <textarea
          rows={10}
          placeholder='Enter text here'
          onChange={(e) => setText(e.target.value)}
          value={curText}
          style={{ flex: 1, marginRight: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", resize: "none" }}
          className='enteredText'
        />
        <textarea
          rows={10}
          placeholder='Translation'
          value={translatedText}
          disabled
          style={{ flex: 1, marginLeft: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          className='translatedText'
        />
      </div>
      <div>
        <ul style={{ display: "flex", alignItems: "center", justifyContent: "space-between", listStyle: "none", padding: "12px 15px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "20px" }}>
          <li style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <i className='fas fa-volume-up' id="from" onClick={speakText} style={{ width: '50px', color: '#adadad', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
              <i className='fas fa-copy' id="from" onClick={copyText} style={{ width: '50px', color: '#adadad', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
            </div>
            <select style={{ flex: 1, marginLeft: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} onChange={(e) => setFromLang(e.target.value)}></select>
          </li>
          <li style={{ width: '50px', color: '#adadad', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 15px' }}>
            <i className="fas fa-exchange-alt" onClick={exchange}></i>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
            <select style={{ flex: 1, marginLeft: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} onChange={(e) => setToLang(e.target.value)}></select>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <i className="fas fa-volume-up" id="to" onClick={speakText} style={{ width: '50px', color: '#adadad', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
              <i className="fas fa-copy" id="to" onClick={copyText} style={{ width: '50px', color: '#adadad', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
            </div>
          </li>
        </ul>
      </div>
      <button style={{ width: '100%', padding: '14px', outline: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginTop: '20px', fontSize: '17px', borderRadius: '5px', background: '#130595' }} className='translate' onClick={translate}>
        Translate Text
      </button>
    </>
  );
}
