import { useState } from "react";
import sendGPTRequest from "../pages/api/GPTAPIs";

export default function GPTInterface(props) {
  const [textInput, setTextInput] = useState("");
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };
  return (
    <form>
      <input type="text" value={textInput} onChange={handleInputChange} />
      <button type="submit" onClick={sendGPTRequest}>
        Submit
      </button>
    </form>
  );
}
