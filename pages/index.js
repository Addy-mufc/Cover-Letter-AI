import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.result);
      setAnimalInput("");
      
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <div> 
      <Head>
        <title>Cover Letter Writer</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Cover Letter AI</h3>
        <TextareaAutosize
        name="resume"
        placeholder="Kindly paste your resume"
        value={animalInput}
        onChange={(e) => setAnimalInput(e.target.value)}
  style={{ width: 1000 }}
/>
        <form onSubmit={onSubmit}>
          
          <input type="submit" value="Generate cover letter now!" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
