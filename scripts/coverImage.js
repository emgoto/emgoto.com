#!/usr/bin/env node

/**
 * This generates the cover images that are used on Twitter and DEV for my posts.
 *
 * This is largely based off of the following script:
 * https://github.com/maxpou/gatsby-starter-morning-dew/blob/master/scripts/generatePostPreviewImages.js
 *
 * To run this file, use the following command:
 *    yarn coverImage <slug>
 *
 * This will navigate to:
 *    localhost:8000/<slug>image_dev
 *    localhost:8000/<slug>image_twitter
 *
 * And take screenshots of both pages using Puppeteer, and put the output in the `static` folder.
 */

const { readFile, existsSync } = require('fs');
const { join, dirname } = require('path');
const glob = require('glob');
const YAML = require('yaml');
const puppeteer = require('puppeteer');

const newSlug = process.argv[2] || '';
const baseUrl = 'http://localhost:8000/';

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const takeScreenshot = async (url, width, height, destination) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1020,
        height: 440,
        deviceScaleFactor: 1,
    });
    await page.goto(url);
    await timeout(5000); // wait for background image to load
    await page.screenshot({
        path: destination,
        clip: {
            x: 0,
            y: 0,
            width,
            height,
        },
    });

    await browser.close();
};

const getArticleFiles = () => {
    return [
        ...glob.sync(join(process.cwd(), 'posts', '**', '*.md')),
        ...glob.sync(join(process.cwd(), 'posts', '**', '*.mdx')),
        ...glob.sync(join(process.cwd(), 'posts', '**', 'index.md')),
        ...glob.sync(join(process.cwd(), 'posts', '**', 'index.mdx')),
        ...glob.sync(join(process.cwd(), 'books', '**', 'index.md')),
        ...glob.sync(join(process.cwd(), 'books', '**', 'index.mdx')),
    ];
};

const parseFile = async file => {
    return new Promise((resolve, reject) => {
        readFile(file, 'utf8', (err, content) => {
            if (err) {
                return reject(err);
            }

            const frontmatter = content.split('---')[1];
            const data = YAML.parse(frontmatter);

            let slug = file.match(/\/([^\/]+).md/)[1];

            if (slug === 'index') {
                slug = file.match(/\/([^\/]+)\/index.md/)[1];
            }

            return resolve({
                ...data,
                file,
                directory: dirname(file),
                slug,
            });
        });
    });
};

const main = async () => {
    const files = await Promise.all(getArticleFiles().map(parseFile));
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.slug === newSlug) {
            const destinationFile = join(
                process.cwd(),
                'static',
                `${file.slug}-twitter.png`,
            );
            if (
                file['generate-card'] !== false &&
                !existsSync(destinationFile)
            ) {
                await takeScreenshot(
                    `${baseUrl}${file.slug}/image_tw`,
                    800,
                    418,
                    destinationFile,
                );
                console.log(`Created ${destinationFile}`);
            }

            const devDestinationFile = join(
                process.cwd(),
                'static',
                `${file.slug}-dev.png`,
            );
            if (
                file['generate-card'] !== false &&
                !existsSync(devDestinationFile)
            ) {
                await takeScreenshot(
                    `${baseUrl}${file.slug}/image_dev`,
                    1000,
                    420,
                    devDestinationFile,
                );
                console.log(`Created ${devDestinationFile}`);
            }
        }
    }
};

main();
