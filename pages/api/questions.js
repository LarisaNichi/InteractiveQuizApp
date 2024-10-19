import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const file = await fs.readFile(
    process.cwd() + '/data/questions.json',
    'utf8'
  );
  const quizes = JSON.parse(file);

  if (req.method === 'GET') {
    try {
      res.status(200).json(quizes);
    } catch (error) {
      res.status(500).json({ error: 'Error reading data' });
    }
  } else if (req.method === 'POST') {
    try {
      quizes.push(req.body);

      const quizesUpdated = JSON.stringify(quizes);
      await fs.writeFile(process.cwd() + '/data/questions.json', quizesUpdated);

      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error storing data' });
    }
  }
}
