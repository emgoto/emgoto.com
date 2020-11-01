import React, { useState, useEffect, useMemo } from 'react';
import Summaries from '../../components/summaries';
import { TagButton, TagsContainer } from './styled';
import { filterPostsByTag, getMostPopularTags } from './utils';

const Tag = ({
    tag: { name, count },
    setSelectedTag,
    isSelected,
}) => {
    const onClick = isSelected
        ? () => setSelectedTag(null)
        : () => setSelectedTag(name);

    return (
        <TagButton
            isSelected={isSelected}
            onClick={onClick}
            type="button"
            data-testid="tagButton"
        >
            {name} ({count})
        </TagButton>
    );
};

const PopularTags = ({
    popularTags,
    selectedTag,
    setSelectedTag,
}) => {
    return (
        <TagsContainer>
            {popularTags.map(tag => (
                <Tag
                    tag={tag}
                    setSelectedTag={setSelectedTag}
                    isSelected={selectedTag === tag.name}
                    key={tag.name}
                />
            ))}
        </TagsContainer>
    );
};

const PostsByTag = ({ posts }) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const popularTags = useMemo(() => getMostPopularTags(posts), [
        posts,
    ]);
    const postsFilteredByTag = useMemo(
        () =>
            selectedTag
                ? filterPostsByTag(posts, selectedTag)
                : posts,
        [posts, selectedTag],
    );

    // If user starts searching and selected tag disappears, we want to de-select it
    useEffect(() => {
        if (
            selectedTag &&
            !popularTags.map(tag => tag.name).includes(selectedTag)
        ) {
            setSelectedTag(null);
        }
    }, [posts, popularTags, selectedTag]);

    return (
        <>
            <PopularTags
                popularTags={popularTags}
                setSelectedTag={setSelectedTag}
                selectedTag={selectedTag}
            />
            <Summaries posts={postsFilteredByTag} />
        </>
    );
};

export default PostsByTag;
