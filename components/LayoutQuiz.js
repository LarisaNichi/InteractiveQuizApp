import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function LayoutQuiz({ category, quizId }) {
  return (
    <>
      <Head>
        <title>{category} quiz</title>
      </Head>
      <h1 className={styles.h1}> {category} Quiz</h1>

      <div className={styles.quizCnt}>
        <p>
          This quiz will include 3 single-answer questions to test your{' '}
          {category} knowledge.
        </p>
        <div>
          <Link href="/categories">
            <button className={`${styles.btn} ${styles.btnLight}`}>
              &lt;&lt;&lt;
            </button>
          </Link>
          <Link href={`/quiz/${quizId}/question/1`}>
            {/* <Link href="/"> */}
            <button className={`${styles.btn} ${styles.btnDark}`}>Start</button>
          </Link>
        </div>
      </div>
    </>
  );
}
