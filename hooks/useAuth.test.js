import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';

describe('useAuth', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return isAuth as false when token is not present in localStorage', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.isAuth).toBeFalsy();
        expect(result.current.username).toBeUndefined();
    });

    it('should return isAuth as true when token is present in localStorage', () => {
        const TOKEN = 'someToken';
        const USERNAME = 'testUser';
        localStorage.setItem('TOKEN', TOKEN);
        localStorage.setItem('USERNAME', USERNAME);
        const { result } = renderHook(() => useAuth());
        expect(result.current.isAuth).toBeTruthy();
        expect(result.current.username).toEqual(USERNAME);
    });
});
