import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuizes(data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className={styles.centerCnt}>
          <h1 className={styles.h1}>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title className="hd-1">Frontend Quiz</title>
        <meta name="description" content="Quiz for HTML / CSS / JS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className={styles.h1}>Test your Frontend knowledge!</h1>
      <div className={styles.containerCnt}>
        <div className={styles.containerCateg}>
          {quizes.map(({ category, id }) => {
            if (category) return <span key={id}>{category}</span>;
          })}
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
