import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
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

export default function Home(): React.ReactElement {
  return (
    <main className={styles.postsContainer}>
      <div className={styles.post}>
        <Link href="/posts">
          <a>Como utilizar hooks</a>
        </Link>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <div className={styles.postInfo}>
          <div className={styles.infoItem}>
            <FiCalendar color="#BBBBBB" />
            <time>15 Mar 2021</time>
          </div>

          <div className={styles.infoItem}>
            <FiUser color="#BBBBBB" />
            <span>Joseph oliveira</span>
          </div>
        </div>
      </div>
      <div className={styles.post}>
        <Link href="/posts">
          <a>Como utilizar hooks</a>
        </Link>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <div className={styles.postInfo}>
          <div className={styles.infoItem}>
            <FiCalendar color="#BBBBBB" />
            <time>15 Mar 2021</time>
          </div>

          <div className={styles.infoItem}>
            <FiUser color="#BBBBBB" />
            <span>Joseph oliveira</span>
          </div>
        </div>
      </div>
      <div className={styles.post}>
        <Link href="/posts">
          <a>Como utilizar hooks</a>
        </Link>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <div className={styles.postInfo}>
          <div className={styles.infoItem}>
            <FiCalendar color="#BBBBBB" />
            <time>15 Mar 2021</time>
          </div>

          <div className={styles.infoItem}>
            <FiUser color="#BBBBBB" />
            <span>Joseph oliveira</span>
          </div>
        </div>
      </div>

      <button
        className={styles.loadMore}
        type="button"
        onClick={() => {
          console.log('click');
        }}
      >
        Carregar mais posts
      </button>
    </main>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
