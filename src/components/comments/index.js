import React, { useEffect } from 'react';

const COMMENTS_ID = 'comments-container';

const Comments = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'emgoto/emgoto-comments');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', 'dark-blue');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        document.getElementById(COMMENTS_ID).appendChild(script);

        // This function will get called when the component unmounts
        // To make sure we don't end up with multiple instances of the comments component
        return () => {
            document.getElementById(COMMENTS_ID).innerHTML = '';
        };
    }, []);

    return (
        <div>
            <h4>Comments</h4>
            <div id={COMMENTS_ID} />
        </div>
    );
};

export default Comments;
