import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import Seo from '../../components/seo';
import SearchBar from '../../components/search-bar';
import PostsByTag from '../../components/posts-by-tag';
import { unFlattenData } from '../../common/utils';

const Blog = ({
    data: {
        localSearchPages: { index, store },
        allMdx: { nodes },
    },
}) => {
    const [query, setQuery] = useState('');

    const results = useFlexSearch(query, index, store);
    // If you pass in an empty query, FlexSearch returns no results
    const posts = query ? unFlattenData(results) : nodes;

    return (
        <>
            <Seo
                slug="blog"
                description="All posts written by Emma Goto."
            />
            <h1>Blog</h1>
            <SearchBar onSearch={setQuery} />
            <PostsByTag posts={posts} />
        </>
    );
};

export const pageQuery = graphql`
    {
        localSearchPages {
            index
            store
        }
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fields: { collection: { eq: "posts" } } }
        ) {
            nodes {
                frontmatter {
                    title
                    tags
                    emoji
                    date(formatString: "DD MMMM YYYY")
                }
                slug
            }
        }
    }
`;

export default Blog;
