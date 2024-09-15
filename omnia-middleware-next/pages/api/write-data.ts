// pages/api/write-data.js
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get the path of the JSON file
      const jsonDirectory = path.join(process.cwd(), 'data.json');

      // Read the current contents of the file
      const fileContents = await fs.readFile(jsonDirectory, 'utf8');
      const data = JSON.parse(fileContents);

      // Add the new data sent in the request to the current data
      const newData = req.body;
      data.push(newData);

      // Write the updated data back to the file
      await fs.writeFile(jsonDirectory, JSON.stringify(data, null, 2));

      // Respond with success
      res.status(200).json({ message: 'Data added successfully', data: newData });
    } catch (error) {
      res.status(500).json({ message: 'Failed to write data', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
