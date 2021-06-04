import mock from 'mock-fs';
import { readFile } from 'fs';
import { ulysses, formatDate } from './ulysses';
const { rename, renameSync, unlink, rmdir } = require('fs');
const { join } = require('path');
const glob = require('glob');

const slug = 'foo-bar';

const mockInput = `# Hello! This is the Ulysses markdown file

This is some text.

## This is a second heading

![This is an image with some alt text](assets/image.png)

Now I'm going to show a gif:

![GIF alt](assets/image.gif)
`;

const expectedResult = `---
title: "Hello! This is the Ulysses markdown file"
date: ${formatDate(new Date())}
tags: []
emoji:
coverImage: ''
---
import Gif from 'components/gif';

This is some text.

## This is a second heading

![This is an image with some alt text](./image.png)

Now I'm going to show a gif:

<Gif src="/${slug}/image.gif" alt="GIF alt"/>
`;

describe('ulysses script', () => {
    let spy;

    mock({
        [`scripts/${slug}.textbundle`]: {
            assets: {
                'image.png': '',
                'image-2.png': '',
                'image.gif': '',
                'image-2.gif': '',
            },
            'info.json': '',
            'text.md': mockInput,
        },
        posts: {},
        static: {},
    });

    afterAll(() => {
        mock.restore();
    });

    test.skip('should successfully move and rename files', async () => {
        await ulysses();

        const staticFiles = glob.sync(
            join(process.cwd(), 'static', '**'),
        );

        const expectedStaticFiles = [
            '',
            slug,
            `${slug}/image-2.gif`,
            `${slug}/image.gif`,
        ].map((file) => join(process.cwd(), 'static', file));

        expect(staticFiles).toEqual(expectedStaticFiles);

        const postFiles = glob.sync(
            join(process.cwd(), 'posts', '**'),
        );

        const expectedPostFiles = [
            '',
            slug,
            `${slug}/image-2.png`,
            `${slug}/image.png`,
            `${slug}/index.mdx`,
        ].map((file) => join(process.cwd(), 'posts', file));

        expect(postFiles).toEqual(expectedPostFiles);

        await new Promise((resolve) => {
            const file = join(
                process.cwd(),
                'posts',
                slug,
                './index.mdx',
            );

            readFile(file, 'utf8', (err, result) => {
                expect(result).toEqual(expectedResult);
                resolve();
            });
        });
    });
});
