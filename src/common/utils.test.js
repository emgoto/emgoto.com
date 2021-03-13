import { unFlattenData } from './utils';

describe('unFlattenData', () => {
    test('should return list of posts in post format', () => {
        const frontmatter = {
            date: '15 Feb 2020',
            emoji: '🐣',
            tags: ['blog'],
            title: 'Blog post title',
        };
        const searchResultPost = { slug: 'sluggy', ...frontmatter };
        const post = { slug: 'sluggy', frontmatter };

        expect(
            unFlattenData([searchResultPost, searchResultPost]),
        ).toEqual([post, post]);
    });
});
