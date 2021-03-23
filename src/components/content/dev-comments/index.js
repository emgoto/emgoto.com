import React, { useState, useEffect } from 'react';
import DevIcon from '../../../images/icon-dev';
import { IconContainer, Interpunct } from '../styled';

const useDevArticleComments = (devArticleId) => {
    const [loading, setLoading] = useState(!!devArticleId);
    const [data, setData] = useState();

    useEffect(() => {
        devArticleId &&
            fetch(`https://dev.to/api/articles/${devArticleId}`)
                .then((response) => response.json())
                .then((response) => {
                    if (response && !response.error) {
                        setData(response);
                    }
                    setLoading(false);
                })
                .catch((error) => setLoading(false));
    }, [devArticleId]);

    return {
        loading,
        data: data && {
            comments: data.comments_count,
            url: data.url,
        },
    };
};

const getMessage = (commentCount) => {
    if (!commentCount) {
        return 'Comment on DEV';
    }

    return commentCount === 1
        ? `1 comment`
        : `${commentCount} comments`;
};

const Comments = ({ devArticleId }) => {
    const { loading, data } = useDevArticleComments(devArticleId);

    return devArticleId && !loading && data ? (
        <>
            <Interpunct>·</Interpunct>
            <IconContainer>
                <a
                    href={`${data.url}#comments`}
                    className="comment-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div>
                        <DevIcon />
                        <div>{getMessage(data.comments)}</div>
                    </div>
                </a>
            </IconContainer>
        </>
    ) : null;
};

export default Comments;
