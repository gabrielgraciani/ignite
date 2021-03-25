import Link from 'next/link';

import styles from './header.module.scss';

export function Header(): React.ReactElement {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <img src="/images/logo.svg" alt="logo" />
        </a>
      </Link>
    </div>
  );
}
