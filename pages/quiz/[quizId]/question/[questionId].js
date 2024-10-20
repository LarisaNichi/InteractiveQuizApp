import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../../../../styles/Home.module.css';
import AnswerMessage from '@/components/AnswerMessage';

export default function QuestionId() {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswers, setcorrectAnswers] = useState(0);
  const router = useRouter();
  const disabled = isSubmitted;
  const { quizId, questionId } = router.query;

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

  const questionIdNr = +questionId;
  const { category, questions } = quizes.find((quiz) => quiz.id === +quizId);
  const questionsNumber = questions.length;
  const { question, answers, correctAnswer } = questions[currentQuestionIdx];
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

    if (currentQuestionIdx !== questionsNumber - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setCurrentQuestionIdx(0);
    }
  }

  return (
    <>
      <h1 className={styles.h1}>
        {category}: Question {currentQuestionIdx + 1} / {questionsNumber}
      </h1>

      <div className={styles.questionCnt}>
        <p>{question}</p>

        <form onSubmit={handleSubmit} className={styles.questionForm}>
          {answers.map((answer, index) => (
            <div
              className={styles.inputQuestionForm}
              key={`${index}-${currentQuestionIdx + 1}`}
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
            {isSubmitted && currentQuestionIdx !== questionsNumber - 1 && (
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

            {isSubmitted && currentQuestionIdx === questionsNumber - 1 && (
              <button
                onClick={() => {
                  localStorage.setItem(
                    'score',
                    JSON.stringify({
                      category,
                      questionsNumber,
                      correctAnswers,
                      quizId,
                    })
                  );
                  router.push(`/quiz/${quizId}/score`);
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
