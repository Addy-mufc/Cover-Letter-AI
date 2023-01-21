import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const resume = req.body.animal || '';
  if (resume.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid resume",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(resume),
      max_tokens: 1000,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    //console.log(completion.data.choices[0].text)
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(resume) {
  return `Here is my resume.

 ${resume}
Write a cover letter for me that starts with Dear Manager,`;
}
