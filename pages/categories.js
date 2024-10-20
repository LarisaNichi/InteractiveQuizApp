import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function Categories() {
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
      <h1 className={styles.h1}>Select your category to start with!</h1>
      <div className={styles.containerCnt}>
        <div
          className={`${styles.containerCateg} ${styles.containerCategActive}`}
        >
          {quizes.map(({ category, id }) => {
            if (category)
              return (
                <Link href={`/quiz/${id}`} key={id}>
                  <span>{category}</span>
                </Link>
              );
          })}
        </div>

        <Link href="/">
          <button className={`${styles.btn} ${styles.btnLight}`}>
            &lt;&lt;&lt;
          </button>
        </Link>
      </div>
    </>
  );
}
