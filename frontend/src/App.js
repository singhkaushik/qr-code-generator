import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  const generateAllQRCodes = () => {
    axios
      .get("http://localhost:3001/generateAllQRCodes")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error generating QR codes:", error);
        setMessage("Error generating QR codes");
      });
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <button onClick={generateAllQRCodes}>Generate All QR Codes</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
