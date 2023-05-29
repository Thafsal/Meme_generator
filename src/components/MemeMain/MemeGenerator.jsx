import React from "react";
import "./MemeGenerator.css";
import { useState } from "react";

function MemeGenerator() {
  const [imageSrc, SetImageSrc] = useState("");
  const [imageName, SetImageName] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [laststName, SetLaststName] = useState("");

  const handleGenerateImg = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      const randomImg = data.data.memes[Math.floor(Math.random() * data.data.memes.length)]
      SetImageSrc(randomImg.url);
      SetImageName(randomImg.name);
    } 
    catch (err) {
      console.log(err);
    }
    }
    const handleFirstMsg = (e)=> {
        SetFirstName(e.target.value)
    }
    const handleSecondMsg = (e)=> {
        SetLaststName(e.target.value)
    }

    return (
      <main>
        <form action="" className="Meme-form">
          <input
            type="text"
            className="Meme-textarea"
            placeholder="First Message"
            value={firstName}
            onChange={handleFirstMsg}
          />
          <input
            type="text"
            className="Meme-textarea"
            placeholder="Second Message"
            value={laststName}
            onChange={handleSecondMsg}
          />
          <button className="Meme-btn" onClick={handleGenerateImg}>Generate a new image</button>
        </form>
        <span className="Meme-img-container">
          <img src={imageSrc} alt={imageName} className="Meme-img" />
          <p className="meme-imgText">{firstName}</p>
          <p className="meme-imgText">{laststName}</p>
        </span>
      </main>
    );
  
}

export default MemeGenerator;
