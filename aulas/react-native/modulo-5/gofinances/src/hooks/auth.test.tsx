import { renderHook, act } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from './auth';

jest.mock('expo-google-app-auth', () => {
  return {
    logInAsync: () => {
      return {
        type: 'success',
        user: {
          id: 'any_id',
          email: 'gabriel@hotmail.com',
          name: 'gabriel',
          photo: 'any_photo.png',
        }
      }
    }
  }
})

describe('Auth hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('gabriel@hotmail.com');
  });
});