import React, { useState } from 'react';

const AddTagsForm = () => {
    const [threadId, setThreadId] = useState('');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newTags = tags.split(',').map(tag => tag.trim());

        // Simulate API call to add tags to the thread
        addTagsToThread(threadId, newTags)
            .then(response => setStatus(response.message))
            .catch(error => setStatus('Error adding tags'));
    };

    const addTagsToThread = (threadId, newTags) => {
        // Simulate a real API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Tags added to thread:', threadId, newTags);
                resolve({ message: 'Tags added successfully!' });
            }, 1000);
        });
    };

    return (
        <div className="container">
            <h1>Add Tags to Thread</h1>
            <form onSubmit={handleSubmit}>
                <label>Thread ID:</label>
                <input 
                    type="text" 
                    value={threadId} 
                    onChange={(e) => setThreadId(e.target.value)} 
                    required 
                />

                <label>Tags (comma separated):</label>
                <input 
                    type="text" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                    required 
                />

                <button type="submit">Add Tags</button>
            </form>
            <div>{status}</div>
        </div>
    );
};

export default AddTagsForm;
