import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ShareVideo from './index';
import '@testing-library/jest-dom'
import { Button } from 'antd';

describe('ShareVideo component', () => {
    test('renders Share a Youtube movie', () => {
        render(<ShareVideo />);
        const titleElement = screen.getByText(/Share a Youtube movie/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders input for Youtube URL', () => {
        render(<ShareVideo />);
        const inputElement = screen.getByPlaceholderText(/Youtube URL/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('renders sharing button', () => {
        render(<ShareVideo />);
        const buttonElement = screen.getByRole('button', { name: /Share/i });
        expect(buttonElement).toBeInTheDocument();
    });

    test('input field changes value when user types', () => {
        render(<ShareVideo />);
        const inputElement = screen.getByTestId('input__url-sharing');

        fireEvent.change(inputElement, { target: { value: 'https://www.youtube.com/watch?v=AKRcAGCo45o' } });

        expect(inputElement.value).toBe('https://www.youtube.com/watch?v=AKRcAGCo45o');
    });

    test('clicking on sharing button calls onSubmit function', () => {
        const onSubmit = jest.fn();
        render(
            <Button data-testid="btn-sharing" data-test="btn-sharing" type="primary" onClick={onSubmit}>
                Share
            </Button>
        )
        const buttonElement = screen.getByTestId('btn-sharing');
        fireEvent.click(buttonElement);
        expect(onSubmit).toHaveBeenCalled();
    });
});
