import React from 'react'; // ✅ Required for JSX in test files
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Component', () => {
    test('renders heading with correct text', () => {
        render(<Home />);
        const heading = screen.getByRole('heading', { name: /Hello, GitHub Actions!/i });
        expect(heading).toBeInTheDocument();
    });
});