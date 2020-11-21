import React from 'react';

import Summaries from '../summaries';

const ReadMore = ({ posts, tag }) => {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <div>
            <h4>More posts about #{tag}</h4>
            <Summaries posts={posts} isCompact />
        </div>
    );
};

export default ReadMore;
