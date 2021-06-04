#!/usr/bin/env node

/**
 * I write my blog posts in the Ulysses text editor.
 *
 * Once I'm done, I export it as a `.textbundle` file (which contains the markdown and the images in a separate folder)..
 *
 * I use this script to move it to the correct place, change file names/location as required, and also add frontmatter to the top of the page!
 */

const { rename, renameSync, unlink, rmdir } = require('fs');
const { join } = require('path');
const glob = require('glob');
const replace = require('replace-in-file');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const frontMatter = (title) =>
    `---
title: "${title}"
date: ${formatDate(new Date())}
tags: []
emoji:
coverImage: ''
---
`;

const ulysses = () => {
    // Get file and move it to posts folder
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
        newFolder = `${postsDirectory}/${slug}`;

        if (imageName.endsWith('.gif')) {
            // Gifs don't work in markdown, so I move them to static folder
            const staticDirectory = join(process.cwd(), 'static');
            newFolder = `${staticDirectory}/${slug}`;
        }

        rename(image, `${newFolder}/${imageName}`, () => {});
    });

    // Remove redundant folder and files, rename markdown file to MDX
    rmdir(`${newFolder}/assets`, () => {});
    unlink(`${newFolder}/info.json`, () => {});
    renameSync(`${newFolder}/text.md`, `${newFolder}/index.mdx`);

    // Rename files

    const options = {
        files: `${newFolder}/index.mdx`,
        from: [/\[\]\(assets/g, /^# .*/g],
        to: [
            '[](.',
            (title) => frontMatter(title.replace('# ', '').trim()),
        ],
    };

    replace.sync(options);
};

ulysses();
