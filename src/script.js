const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const openai = new OpenAI({ key: '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' });

app.post('/ask', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const response = await openai.complete({
      prompt: prompt,
      max_tokens: 100, // Adjust as needed
      n: 1, // Adjust as needed
      stop: '\n', // Stop at the end of the first line
    });

    const answer = response.choices[0].text.trim();

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
