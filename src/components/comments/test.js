import React from 'react';
import { render } from '@testing-library/react';

import Comments from './index';

describe('Comments component', () => {
    test('should render comments', () => {
        const { container } = render(<Comments />);
        const script = container.querySelector(
            'script[src="https://utteranc.es/client.js"]',
        );
        expect(script).toBeTruthy();
    });
});
