import React from "react";
import "./MemeGenerator.css";
import { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";

function MemeGenerator(ref) {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImg, setRandomImg] = useState(
    "https://i.imgflip.com/7l7t8m.jpg"
  );
  const [allImages, setAllImages] = useState([]);
  const memeImgRef = useRef(null);

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
  const resetText = () => {
    setTopText(" ");
    setBottomText(" ");
    console.log("Button clicked");
  };

  const handleDownload = () => {
    if (memeImgRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous";

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        context.font = "35px Arial";
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.textAlign = "center";

        const textX = canvas.width / 2;
        const textY = 50;

        context.fillText(topText, textX, textY);
        context.strokeText(topText, textX, textY);
        context.fillText(bottomText, textX, canvas.height - 20);
        context.strokeText(bottomText, textX, canvas.height - 20);

        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${topText}_meme.png`;
        link.click();
      };

      image.src = memeImgRef.current.src;
    }
  };

  return (
    <main>
      <Header buttonReset={resetText} downloadBtn={handleDownload} />
      <form onSubmit={handleSubmit} className="Meme-form">
        <label htmlFor="topText" className="Meme-textarea">
          <input
            className="Meme-input"
            type="text"
            value={topText}
            name="topText"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="bottomText" className="Meme-textarea">
          <input
            className="Meme-input"
            type="text"
            value={bottomText}
            name="bottomText"
            onChange={handleChange}
          />
        </label>
        <button className="Meme-btn">Generate a new image</button>
      </form>
      <div className="Meme-img-container">
        <img
          src={randomImg}
          alt="random-Img"
          className="Meme-img"
          ref={memeImgRef}
        />
        <p className="meme-imgText-top">{topText}</p>
        <p className="meme-imgText-bottom">{bottomText}</p>
      </div>
    </main>
  );
}

export default MemeGenerator;
