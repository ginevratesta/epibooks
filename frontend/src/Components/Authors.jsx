import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Authors = () => {
    const [authors, setAuthors] = useState(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const res = await axios.get('http://localhost:3030/getAuthors');
                setAuthors(res.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchAuthors();
    }, []);

    return (
        <div>
            <ol>
                {authors?.map(author => <li key={author._id}>{author.name} {author.surname}</li>)}
            </ol>
        </div>
    );
}

export default Authors;
