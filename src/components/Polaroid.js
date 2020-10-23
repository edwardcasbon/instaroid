import React, { useEffect, useState } from 'react';
import { getPost } from '../utilities/post';

function Polaroid ( props ) {
    const initialPostState = {
        image: '',
        author: '',
    };

    const [ loading, setLoading ] = useState(false);
    const [ post, setPost ] = useState(initialPostState);
    
    useEffect(() => {
        if ( props.url !== '' ) {
            setLoading(true);
            getPost(props.url)
                .then(p => {
                    setPost(p);
                    setLoading(false);
                })
                .catch(err => {
                    window.console.error(err);
                    setPost(initialPostState);
                });
        }
    }, [props.url]);

    return <React.Fragment>
        <div className="polaroid">
            <div className="polaroid__image" style={{
                backgroundImage: `url(${post.image})`,
            }} />
            <p className="polaroid__author">{post.author}</p>
        </div>
    </React.Fragment>;    
}

export default Polaroid;