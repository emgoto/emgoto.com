#!/usr/bin/env node

const replace = require('replace-in-file');

const main = async () => {
    const options = {
        files: `${process.cwd()}/folderName/index.md`,
        from: 'Hello',
        to: 'Goodbye',
    };

    return replace(options);
};

export { main };
