import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Link from 'next/link';
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Header } from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({
  postsPagination,
}: HomeProps): React.ReactElement {
  const [postsPaginated, setPostsPaginated] = useState<Post[]>(
    postsPagination.results
  );
  const [hasNextPage, setHasNextPage] = useState(!!postsPagination.next_page);

  function handleLoadMore(): void {
    if (hasNextPage) {
      fetch(postsPagination.next_page)
        .then(response => response.json())
        .then(data => {
          setPostsPaginated([...postsPaginated, ...data.results]);
          setHasNextPage(!!data.next_page);
        });
    }
  }

  return (
    <>
      <Head>
        <title>Home | SpaceTraveling</title>
      </Head>
      <Header />
      <main className={styles.postsContainer}>
        {postsPaginated.map(post => (
          <div className={styles.post} key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>{post.data.title}</a>
            </Link>
            <p>{post.data.subtitle}</p>

            <div className={styles.postInfo}>
              <div className={styles.infoItem}>
                <FiCalendar color="#BBBBBB" />
                <time>{post.first_publication_date}</time>
              </div>

              <div className={styles.infoItem}>
                <FiUser color="#BBBBBB" />
                <span>{post.data.author}</span>
              </div>
            </div>
          </div>
        ))}

        {hasNextPage && (
          <button
            className={styles.loadMore}
            type="button"
            onClick={handleLoadMore}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
    }
  );

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      first_publication_date: format(
        new Date(post.first_publication_date),
        'd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
    };
  });

  const postsPagination = {
    next_page: response.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
