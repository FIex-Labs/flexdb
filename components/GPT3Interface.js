import { useState } from "react"
const { Configuration, OpenAIApi } = require("openai")

export default function GPTInterface(props) {
  const [textInput, setTextInput] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    setTextInput(event.target.value)
  };
  const handleInput = async (event) => {
    if (!submitted) {
      let GPTInput = document.getElementById("gptsetup")
      //   let URL = process.env.NEXT_PUBLIC_GPT_Microservice_URL + "generateSchema";
      //   console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration)

      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: textInput,
      })

      console.log(completion)
      let ret = completion.data.choices[0].text
      console.log(ret)
    }
  };
  return (
    <div>
      <input
        id="gptsetup"
        type="text"
        value={textInput}
        onChange={handleInputChange}
      />
      <button onClick={handleInput}>Submit</button>
    </div>
  )
}
