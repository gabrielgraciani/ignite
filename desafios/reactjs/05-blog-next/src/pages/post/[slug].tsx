import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';
import { Header } from '../../components/Header';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: {
        text: string;
      }[];
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): React.ReactElement {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }
  return (
    <>
      <Head>
        <title>{post.data.title} | SpaceTraveling</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.banner}>
          <img src={post.data.banner.url} alt={post.data.title} />
        </div>
        <div className={styles.post}>
          <div className={styles.title}>
            <h1>{post.data.title}</h1>
          </div>
          <div className={styles.postInfo}>
            <div className={styles.infoItem}>
              <FiCalendar color="#BBBBBB" />
              <time>{post.first_publication_date}</time>
            </div>

            <div className={styles.infoItem}>
              <FiUser color="#BBBBBB" />
              <span>{post.data.author}</span>
            </div>

            <div className={styles.infoItem}>
              <FiClock color="#BBBBBB" />
              <span>4 min</span>
            </div>
          </div>

          {post.data.content.map(content => {
            const heading = content.heading.map((contentHead, index) => (
              <div
                className={styles.postContent}
                key={index}
                dangerouslySetInnerHTML={{ __html: contentHead.text }}
              />
            ));

            const body = content.body.map((contentBody, index) => (
              <div
                className={styles.postContent}
                key={index}
                dangerouslySetInnerHTML={{ __html: contentBody.text }}
              />
            ));

            return [heading, body];
          })}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'como-utilizar-hooks',
        },
      },
      {
        params: {
          slug: 'criando-um-app-cra-do-zero',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'd MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
