import React, { useState } from "react";
import "./style.css";
import ListItem from "./components/ListItem";
import Logo from "./assets/logoShopl.png";
import Overlay from "./components/Overlay";
import Button from "./components/Button";

function App() {
  const [overlay, setOverlay] = useState("OverlayFalse");
  console.log(overlay);

  return (
    <div className="App">
      <img className="logo" src={Logo} alt="Shopl Logo"></img>
      <Button
        ButtonTxt="Add to List"
        onClick={() => setOverlay("OverlayTrue")}
      ></Button>
      {overlay === "OverlayTrue" && <Overlay />}
      <ListItem />
      <ListItem />
    </div>
  );
}

export default App;
