import React from "react";
import Logo from "../../images/trollface-png.jpg";
import "./Header.css";

function Header({buttonReset}) {

  return (
    <header className="Header-container">
      <img src={Logo} alt="Logo-img" className="Header-logo" />
      <h1 className="Header-title">Meme Generator</h1>
      <button className="Header-btn" onClick={buttonReset}>Reset</button>
    </header>
  );
}

export default Header;
