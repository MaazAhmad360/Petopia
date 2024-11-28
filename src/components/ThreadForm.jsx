import React, { useState } from 'react';

const ThreadForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newThread = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            author: 'CurrentUser', // This should be dynamic based on logged-in user
            creationDate: new Date().toISOString(),
        };

        // Simulate API call to create thread
        createThread(newThread)
            .then(response => setStatus(response.message))
            .catch(error => setStatus('Error creating thread'));
    };

    const createThread = (thread) => {
        // Simulate a real API call (use fetch or axios in a real app)
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Thread created:', thread);
                resolve({ message: 'Thread created successfully!' });
            }, 1000);
        });
    };

    return (
        <div className="container">
            <h1>Create Forum Thread</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />

                <label>Content:</label>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    rows="4" 
                    required 
                />

                <label>Tags (comma separated):</label>
                <input 
                    type="text" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                />

                <button type="submit">Create Thread</button>
            </form>
            <div>{status}</div>
        </div>
    );
};

export default ThreadForm;
