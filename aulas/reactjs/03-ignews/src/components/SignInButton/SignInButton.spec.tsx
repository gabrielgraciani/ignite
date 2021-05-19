import { render, screen } from '@testing-library/react';
import {useSession} from 'next-auth/client';
import {mocked} from 'ts-jest/utils';
import { SignInButton } from '.'

jest.mock('next-auth/client',)

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionsMocked = mocked(useSession);
    useSessionsMocked.mockReturnValue([null, false]);

    render(
      <SignInButton />
    );
  
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    const useSessionsMocked = mocked(useSession);
    useSessionsMocked.mockReturnValue([{ user: { name: 'John Doe', email: 'john.doe@example.com'}, expires: 'fake-expires'}, false]);

    render(
      <SignInButton />
    );
  
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
})

