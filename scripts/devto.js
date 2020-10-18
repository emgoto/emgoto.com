#!/usr/bin/env node

/**
 * This is a script that aids me in setting up my DEV.to draft.
 *
 * It updates the frontmatter as well as the links to all the images.
 *
 * Run with command `yarn devto <post-slug>`
 *
 */

const { readFile, writeFile } = require('fs');
const { join } = require('path');
const glob = require('glob');
const fetch = require('node-fetch');
require('dotenv').config();

const updateFrontMatter = (content, slug) => {
    content = content.replace(/date: .*\n/, 'published: false\n');
    content = content.replace(/devArticleId: .*\n/, '');
    content = content.replace(
        /emoji: .*\n/,
        `canonical_url: https://www.emgoto.com/${slug}/` + '\n',
    );
    content = content.replace(
        /coverImage: .*\n/,
        `cover_image: https://www.emgoto.com/${slug}-dev.png` + '\n',
    );

    return content;
};

const updateArticle = (devArticleId, content) => {
    console.log('Updating post...');
    fetch(`https://dev.to/api/articles/${devArticleId}`, {
        method: 'PUT',
        headers: {
            'api-key': process.env.DEV_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            article: {
                body_markdown: content,
            },
        }),
    })
        .then(response => response.json())
        .then(response => {
            response.error
                ? console.log('Did not suceed', response)
                : console.log('Update succeeded.', response.url);
        })
        .catch(error => {
            console.log('Failed to update article');
        });
};

const main = () => {
    const slug = process.argv[2];
    const file = glob.sync(
        join(process.cwd(), 'posts', slug, 'index.md'),
    )[0];

    readFile(file, 'utf8', (err, content) => {
        if (err) {
            return reject(err);
        }

        const title = content.match(/title: "(.*)"\n/)[1];
        console.log('Found title:', title);

        content = updateFrontMatter(content, slug);

        // Update images
        content = content.replace(
            /!\[\]\(./g,
            `![](https://raw.githubusercontent.com/emgoto/emgoto.com/master/posts/${slug}/`,
        );

        fetch('https://dev.to/api/articles/me/unpublished', {
            headers: { 'api-key': process.env.DEV_API_KEY },
        })
            .then(response => response.json())
            .then(response => {
                if (response.length > 0) {
                    const draftTitle = response[0].title;
                    console.log('Got unpublished title:', draftTitle);
                    if (draftTitle === title) {
                        const devArticleId = response[0].id;
                        updateArticle(devArticleId, content);
                    }
                }
            })
            .catch(error => {
                console.log('Failed to fetch unpublished articles');
            });
    });
};

main();
