import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getPrismicClient } from '../../services/prismic'

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const post = { slug: 'my-new-post', title: 'My new post', content: '<p>Post excerpt</p>', updatedAt: '01 de Abril' }

jest.mock('../../services/prismic');
jest.mock('next-auth/client');
jest.mock('next/router');

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
  });

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription'}, false
    ] as any);

    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)
    
    render(<Post post={post} />)
    
    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });
  
  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post'}
          ],
          content: [
            { type: 'paragraph', text: 'Post excerpt'}
          ],
        },
        last_publication_data: '04-01-2021'
      })
    } as any);

    const response = await getStaticProps({ params: { slug: 'my-new-post'}});
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post excerpt</p>',
            updatedAt: 'Invalid Date'
          }
        }
      })
    )
  })
})