import React from "react";
import "./MemeGenerator.css";
import { useState, useEffect} from "react";
import Header from "../Header/Header";

function MemeGenerator(ref) {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImg, setRandomImg] = useState(
    "https://i.imgflip.com/7l7t8m.jpg"
  );
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setAllImages(memes);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "topText") {
      setTopText(value);
    } else if (name === "bottomText") {
      setBottomText(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * allImages.length);
    const randomMemeImg = allImages[randomNum].url;
    setRandomImg(randomMemeImg);
  };
  const resetText = () =>{
    setTopText(" ")
    setBottomText(" ")
    console.log("Button clicked")
  }

  return (
    <main>
      <Header 
        buttonReset={resetText}
      />
      <form onSubmit={handleSubmit} className="Meme-form">
        <label htmlFor="topText">
          <input
            className="Meme-textarea"
            type="text"
            value={topText}
            name="topText"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="bottomText">
          <input
            className="Meme-textarea"
            type="text"
            value={bottomText}
            name="bottomText"
            onChange={handleChange}
          />
        </label>
        <button className="Meme-btn">Generate a new image</button>
      </form>
      <div className="Meme-img-container">
        <img src={randomImg} alt="random-Img" className="Meme-img" />
        <p className="meme-imgText-top">{topText}</p>
        <p className="meme-imgText-bottom">{bottomText}</p>
      </div>
    </main>
  );
}

export default MemeGenerator;
