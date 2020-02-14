import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Actions = () => {
    const [ actions, setActions ] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/actions')
        .then(res => {
            console.log(res)
            setActions(res.data)
        })
        .catch(err => 
            console.log(err))
    },[])

    return(
        <>
            <h2>All Actions</h2>
            {actions.map(item => <div key={item.id}><h2>{item.description}</h2><h3>{item.notes}</h3><h4>{item.completed ? 'completed' : 'Not Completed'}</h4></div>)}

        </>
    )
}

export default Actions;