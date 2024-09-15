// pages/api/read-data.js
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  // Get the path of the JSON file
  const jsonDirectory = path.join(process.cwd(), 'data.json');

  // Read the JSON file
  const fileContents = await fs.readFile(jsonDirectory, 'utf8');

  // Return the content of the data file in JSON format
  res.status(200).json(JSON.parse(fileContents));
}
