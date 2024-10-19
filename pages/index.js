import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title className="hd-1">Frontend Quiz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className={styles.h1}>Test your Frontend knowledge!</h1>
      <div className={styles.containerCnt}>
        <div className={styles.containerCateg}>
          <span>HTML</span>
          <span>CSS</span>
          <span>JS</span>
        </div>
        <Link href="/categories">
          <button className={`${styles.btn} ${styles.btnDark}`}>
            Start your quiz
          </button>
        </Link>
      </div>
    </>
  );
}
