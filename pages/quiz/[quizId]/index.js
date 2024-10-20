import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LayoutQuiz from '@/components/LayoutQuiz';
import styles from '../../../styles/Home.module.css';

export default function Quiz() {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { quizId } = router.query;

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

  const category = quizes.find((quiz) => quiz.id === Number(quizId)).category;

  return <LayoutQuiz category={category} quizId={quizId} />;
}
