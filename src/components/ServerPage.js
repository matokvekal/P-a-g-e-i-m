import React, { useState, useEffect } from 'react';
import { apiEndPoint1, configHeader } from '../Config'
import axios from 'axios';
import Button from '@material-ui/core/Button';


function ServerPage() {
    const API_ENDPOINT = apiEndPoint1();
    //   const config = configHeader();
    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('redux');
    const [search, setSearch] = useState('redux');
    const [url, setUrl] = useState(
        '${API_ENDPOINT}/search?query=redux',
    );
    const postrequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hook Post' })
    }

    
    useEffect(() => {
        console.log('1')
        const fetchData = async () => {
            console.log('3')
            const result = await axios(
                `${API_ENDPOINT}/search?query=${query}`, 
            );
            console.log('5')
            setData(result.data);
            console.log('6')
        };
        console.log('2')
        fetchData().then(
            console.log('4')
        );
    }, [search]);

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <Button variant="contained" color='Primary' size='small' onClick={() => setSearch(query)}>Search</Button>

            <ul>
                {data.hits.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ServerPage;