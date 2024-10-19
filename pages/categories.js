import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Categories() {
  return (
    <>
      <h1 className={styles.h1}>Select your category to start with!</h1>
      <div className={styles.containerCnt}>
        <div
          className={`${styles.containerCateg} ${styles.containerCategActive}`}
        >
          <Link href="/quiz/1">
            <span>HTML</span>
          </Link>
          <Link href="/quiz/2">
            <span>CSS</span>
          </Link>
          <Link href="/quiz/3">
            <span>JS</span>
          </Link>
        </div>
        <Link href="/">
          <button className={`${styles.btn} ${styles.btnLight}`}>
            Go back
          </button>
        </Link>
      </div>
    </>
  );
}
