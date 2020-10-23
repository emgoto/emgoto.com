import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SearchBar from './index';

expect.extend(toHaveNoViolations);

describe('SearchBar component', () => {
    test('should not have any accessibility violations', async () => {
        const { container } = render(<SearchBar />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
