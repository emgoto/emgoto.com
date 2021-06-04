import mock from 'mock-fs';
import { readFileSync } from 'fs';
import { main } from '../modifyFile';

describe('script', () => {
    mock({
        folderName: {
            'index.md': '# Hello world!',
        },
    });

    afterAll(() => {
        mock.restore();
    });

    test('should replace Hello with Goodbye', async () => {
        await main();

        const expectedResult = '# Goodbye world!';

        const file = `${process.cwd()}/folderName/index.md`;
        const result = readFileSync(file, 'utf8');
        expect(result).toEqual(expectedResult);
    });
});
