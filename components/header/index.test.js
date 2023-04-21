import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { apiRegister } from '../../services/authentication';
import Header from './index';
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('../../services/authentication', () => ({
    apiRegister: jest.fn()
}));

describe('Header component', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render the header and logo', () => {
        const { getByTestId } = render(<Header />);

        expect(getByTestId('header__logo')).toBeInTheDocument();
    });

    it('should render the login form if user is not authenticated', () => {
        const { getByTestId } = render(<Header />);

        const usernameInput = getByTestId('input__username');
        const passwordInput = getByTestId('input__password');
        const submitButton = getByTestId('button__login');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(submitButton);

        expect(apiRegister).toHaveBeenCalled();
    });
});
