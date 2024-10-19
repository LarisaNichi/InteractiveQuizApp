import { useRouter } from 'next/router';
import Link from 'next/link';
import { quizes } from '@/pages/Dates/questions';
import styles from '../../../../styles/Home.module.css';

export default function QuestionId() {
  const router = useRouter();
  const { quizId, questionId } = router.query;

  const { category, questions } = quizes.find(
    (quiz) => quiz.id === Number(quizId)
  );

  const { question, answers, correctAnswer } = questions.find(
    (question, index) => index + 1 === +questionId
  );

  return (
    <>
      <h1 className={styles.h1}>
        {' '}
        {category}: Question {questionId} / {questions.length}
      </h1>

      <div className={styles.questionCnt}>
        <p>{question}</p>

        <form action="#" className={styles.questionForm}>
          {answers.map((answer, index) => (
            <div
              className={styles.inputQuestionForm}
              key={`${index}-${questionId}`}
            >
              <input
                type="radio"
                name={category}
                value={answer}
                id={questionId}
              />
              <label htmlFor={questionId}> {answer} </label>
            </div>
          ))}
          <div className={styles.btnForm}>
            {Number(questionId) < questions.length ? (
              <Link href={`/quiz/${quizId}/question/${Number(questionId) + 1}`}>
                <button
                  className={`${styles.btn} ${styles.btnLight}`}
                  type="button"
                >
                  &gt;&gt;&gt;
                </button>
              </Link>
            ) : (
              <>
                <Link href="/categories">
                  <button
                    className={`${styles.btn} ${styles.btnDark}`}
                    type="button"
                  >
                    Submit
                  </button>
                </Link>{' '}
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
