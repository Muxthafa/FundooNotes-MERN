import React, { useState } from "react";
import Service from "./service/NoteService";

export default function Demo() {
  // const [counter, setcounter] = React.useState(0);
  const [file, setFile] = useState(null);

  const handleFile = () => {
    var data = new FormData();
    data.append("file", file);
    Service.uploadImage(data)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  };
  return (
    <div>
      {/*  <h1>This is counter app</h1>
      <div id="counter-value">{counter}</div>
      <button id="increment-btn" onClick={() => setcounter(counter + 1)}>
        Increment
      </button>
      <button id="decrement-btn" onClick={() => setcounter(counter - 1)}>
        Decrement
      </button> */}

        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleFile} />
    </div>
  );
}
