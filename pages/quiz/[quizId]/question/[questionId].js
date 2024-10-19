import { useRouter } from 'next/router';
import Link from 'next/link';
import { promises as fs } from 'fs';
import { useState } from 'react';
import styles from '../../../../styles/Home.module.css';
import AnswerMessage from '@/components/AnswerMessage';

export async function getServerSideProps() {
  const file = await fs.readFile(
    process.cwd() + '/data/questions.json',
    'utf8'
  );
  const quizes = JSON.parse(file);
  return { props: { quizes } };
}

export default function QuestionId({ quizes }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswers, setcorrectAnswers] = useState(0);

  const disabled = isSubmitted;

  const router = useRouter();
  const { quizId, questionId } = router.query;

  const { category, questions } = quizes.find(
    (quiz) => quiz.id === Number(quizId)
  );
  const questionIdNr = +questionId;
  const questionsNumber = questions.length;

  const { question, answers, correctAnswer } = questions.find(
    (question, index) => index + 1 === questionIdNr
  );

  const isCorrectAnswer = answers[selectedAnswerIndex] === correctAnswer;

  function handleSelectedAnswer(index) {
    setSelectedAnswerIndex(index);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if (isCorrectAnswer) {
      setcorrectAnswers(correctAnswers + 1);
    }
  }

  function handleNextQuestion() {
    setSelectedAnswerIndex(null);
    setIsSubmitted(false);
  }

  return (
    <>
      <h1 className={styles.h1}>
        {category}: Question {questionId} / {questions.length}
      </h1>

      <div className={styles.questionCnt}>
        <p>{question}</p>

        <form onSubmit={handleSubmit} className={styles.questionForm}>
          {answers.map((answer, index) => (
            <div
              className={styles.inputQuestionForm}
              key={`${index}-${questionId}`}
            >
              <label
                htmlFor={index}
                className={
                  selectedAnswerIndex === index ? styles.selectedLabel : ''
                }
              >
                <input
                  onChange={() => handleSelectedAnswer(index)}
                  type="radio"
                  name={category}
                  id={index}
                  className="radioButton"
                  disabled={disabled}
                  required={true}
                />
                {answer}
              </label>
            </div>
          ))}

          {disabled && (
            <AnswerMessage
              isCorrectAnswer={isCorrectAnswer}
              correctAnswer={correctAnswer}
            />
          )}

          <div className={styles.btnForm}>
            {!isSubmitted && (
              <button className={`${styles.btn} ${styles.btnDark}`}>
                Send
              </button>
            )}
            {isSubmitted && questionIdNr < questions.length && (
              <Link href={`/quiz/${quizId}/question/${questionIdNr + 1}`}>
                <button
                  onClick={handleNextQuestion}
                  className={`${styles.btn} ${styles.btnLight}`}
                  type="button"
                >
                  Next
                </button>
              </Link>
            )}

            {isSubmitted && questionIdNr === questions.length && (
              <button
                onClick={() => {
                  router.push(`/quiz/${quizId}/score`);
                  localStorage.setItem(
                    'score',
                    JSON.stringify({
                      category,
                      questionsNumber,
                      correctAnswers,
                    })
                  );
                }}
                className={`${styles.btn} ${styles.btnDark}`}
                type="button"
              >
                Finish
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
