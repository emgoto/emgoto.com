#!/usr/bin/env node

/**
 * I write my blog posts in the Ulysses text editor.
 *
 * Once I'm done, I export it as a `.textbundle` file (which contains the markdown and the images in a separate folder).
 *
 * I use this script to move it to the correct place, change file names/location as required, and also add frontmatter to the top of the page
 */

const {
    rename,
    renameSync,
    unlink,
    rmdir,
    mkdirSync,
    readFileSync,
    readFile,
    writeFileSync,
} = require('fs');
const { join } = require('path');
const glob = require('glob');
const replace = require('replace-in-file');

export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

const getFrontMatter = (title) =>
    `---
title: "${title}"
date: ${formatDate(new Date())}
tags: []
emoji:
coverImage: ''
---

import Gif from 'components/gif';
`;

const renameAndMoveUlyssesTextbundle = async () => {
    const file = glob.sync(
        join(process.cwd(), 'scripts', '**', '*.textbundle'),
    )[0];

    const slug = file.match(/\/([^\/]+).textbundle/)[1];
    const postsDirectory = join(process.cwd(), 'posts');
    let newFolder = `${postsDirectory}/${slug}`;
    renameSync(file, newFolder);

    // Move all the image files from the assets folder to the same folder
    const images = glob.sync(join(newFolder, 'assets', '*'));
    images.forEach((image) => {
        let imageName = image.match(/assets\/([^\/]+)/)[1];
        const newFolder = `${postsDirectory}/${slug}`;

        if (imageName.endsWith('.gif')) {
            // Gifs don't work in markdown, so I move them to static folder
            const staticFolder = join(process.cwd(), 'static', slug);

            const staticFolderExists =
                glob.sync(join(staticFolder, '**')).length > 0;

            !staticFolderExists && mkdirSync(staticFolder);

            renameSync(image, `${staticFolder}/${imageName}`);
        } else {
            renameSync(image, `${newFolder}/${imageName}`);
        }
    });

    // Remove redundant folder and files, rename markdown file to MDX
    rmdir(`${newFolder}/assets`, () => {});
    unlink(`${newFolder}/info.json`, () => {});
    renameSync(`${newFolder}/text.md`, `${newFolder}/index.mdx`);

    const headerRegex = /^# .*/g;
    const markdownPngRegex = /!\[.*\]\(assets.*gif\)/g;
    const markdownGifRegex = /^!\[.*\]\(assets.*gif\)/g;

    const headerFn = (title) =>
        getFrontMatter(title.replace('# ', '').trim());
    const markdownPngFn = (line) => line.replace(/\(assets/, '(.');

    const markdownGifFn = (line) => {
        console.log('line', line);
        line.replace(/\(assets/, `(${slug}`);
    };

    const options = {
        files: `${newFolder}/index.mdx`,
        from: [headerRegex, markdownPngRegex, markdownGifRegex],
        to: [headerFn, markdownPngFn, markdownGifFn],
    };

    return replace(options);
};

export { renameAndMoveUlyssesTextbundle as ulysses2 };

const foo = () => {
    const file = glob.sync(
        join(
            process.cwd(),
            'scripts',
            '**',
            '*.textbundle',
            'text.md',
        ),
    )[0];

    const content = readFileSync(file, 'utf8');

    const newContent = content.replace('# Hello!', 'goodbye');

    writeFileSync(file, newContent, 'utf8');

    console.log(readFileSync(file, 'utf8'));
};

export { foo as ulysses };
