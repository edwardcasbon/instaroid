import React, { useState } from 'react';
import Form from './Form';
import Polaroid from './Polaroid';

function Body () {
    const [ url, setUrl ] = useState('');

    return <React.Fragment>
        <Form setUrl={setUrl} />
        <Polaroid url={url} />
    </React.Fragment>
}

export default Body;