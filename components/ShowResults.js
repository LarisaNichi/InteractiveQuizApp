import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function ShowResults({
  category,
  questionsNumber,
  correctAnswers,
}) {
  const successRate = ((correctAnswers / questionsNumber) * 100).toFixed(2);

  return (
    <>
      <h1 className={styles.h1}>Overall score for {category} Quiz</h1>

      <div className={styles.resultCtn}>
        <h2 className={styles.h2}>
          <span>Total questions: {questionsNumber}</span>
          <span>Total correct answers: {correctAnswers}</span>
          <span> Success rate: {successRate}%</span>
        </h2>
        <p className={styles.textCnt}>
          {successRate > Number(66.66)
            ? 'You did a very good job!'
            : 'You need to practice more!'}
        </p>

        <Link href={'/'}>
          <button className={`${styles.btn} ${styles.btnDark}`} type="button">
            Try again!
          </button>
        </Link>
      </div>
    </>
  );
}
