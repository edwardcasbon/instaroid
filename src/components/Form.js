import React, { useState } from 'react';

function Form ( props ) {
    const [ url, setUrl ] = useState('');

    return <form onSubmit={e => {
        e.preventDefault();
        props.setUrl(url);
    }}>
        <input type="text" name="url" onChange={e => {setUrl(e.target.value)}} />
        <input type="submit" value="Fetch" />
    </form>;
}

export default Form;