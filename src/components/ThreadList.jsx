import React, { useEffect, useState } from 'react';

const ThreadList = () => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        // Simulate fetching threads
        const fetchThreads = () => {
            // Replace with real API call
            return [
                { id: 1, title: 'How to adopt a pet?', author: 'Alice', creationDate: '2024-11-20T12:30:00' },
                { id: 2, title: 'Best dog breeds for families', author: 'Bob', creationDate: '2024-11-21T14:00:00' },
            ];
        };

        setThreads(fetchThreads());
    }, []);

    return (
        <div className="container">
            <h1>Forum Threads</h1>
            <ul>
                {threads.map((thread) => (
                    <li key={thread.id}>
                        <a href={`/thread/${thread.id}`}>{thread.title}</a>
                        <p>by {thread.author} on {new Date(thread.creationDate).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => window.location.href = '/create-thread'}>Create New Thread</button>
        </div>
    );
};

export default ThreadList;
