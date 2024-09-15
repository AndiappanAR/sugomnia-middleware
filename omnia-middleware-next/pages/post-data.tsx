import { useState } from 'react';

export default function AddPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the new post data
    const newPost = {
      id: Math.random(), // Generate a random ID
      title,
      content,
    };

    // Send a POST request to write data
    const response = await fetch('/api/write-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Post added successfully!');
    } else {
      alert('Failed to add post: ' + result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
}
