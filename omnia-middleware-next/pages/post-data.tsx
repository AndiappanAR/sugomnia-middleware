// pages/index.js (continuation)
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [cachedData, setCachedData] = useState(null);
  const [newData, setNewData] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/cache');
      const data = await response.json();
      setCachedData(data);
    }

    fetchData();
  }, []);

  const handleCacheSave = async () => {
    const response = await fetch('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newData }),
    });

    const result = await response.json();
    setCachedData(result);
  };

  return (
    <div>
      <h1>Cached Data</h1>
      {cachedData ? (
        <pre>{JSON.stringify(cachedData, null, 2)}</pre>
      ) : (
        <p>No cached data found</p>
      )}

      <div>
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder="Enter new data to cache"
        />
        <button onClick={handleCacheSave}>Cache Data</button>
      </div>
    </div>
  );
}
