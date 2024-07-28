import React from "react";
import "../style.css";

export default function Button({ ButtonTxt, onClick }: any) {
  return (
    <button type="button" className="button" onClick={onClick}>
      {ButtonTxt}
    </button>
  );
}
