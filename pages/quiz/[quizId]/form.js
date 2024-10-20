import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';

export default function AddQuestion() {
  const [localValue, setLocalValue] = useState({});
  const [formFields, setFormFields] = useState({
    question: '',
    answers: [],
    correctAnswer: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    let value;
    value = JSON.parse(localStorage.getItem('score')) || '';
    setLocalValue(value);
  }, []);

  const { category } = localValue;
  const answersNumber = new Array(3).fill('');

  function handleInputQuestionOrCorrectAnswer(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  }

  function handleInputAnswer(e, index) {
    const fieldName = 'answers';
    const fieldValue = e.target.value;
    const answersValues = formFields[fieldName];
    answersValues[index] = fieldValue;

    setFormFields((prevState) => ({
      ...prevState,
      [fieldName]: answersValues,
    }));
  }

  function areAnswersUnique() {
    let uniqueAnswers = new Set();
    formFields.answers.forEach((answer) => uniqueAnswers.add(answer));
    if (uniqueAnswers.size !== formFields.answers.length) {
      return false;
    }
    return true;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const areAnswersDifferent = areAnswersUnique();
    if (!areAnswersDifferent || !formFields.correctAnswer) {
      let error;
      !formFields.correctAnswer && (error = 'Please select an answer');
      !areAnswersDifferent &&
        (error = 'Please input different answers in the form');
      if (error) {
        setError(error);
      }
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData(e.target);
      const { question, correctAnswer, ...answersObject } =
        Object.fromEntries(formData);
      const answers = Object.values(answersObject);

      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          quizQuestion: { question, answers, correctAnswer },
          category,
        }),
      });

      const result = await response.json();
      console.log(result);

      setFormSuccess(true);
      setFormFields({
        question: '',
        answers: [],
        correctAnswer: '',
      });
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (formSuccess)
    return (
      <div className={styles.containerCnt}>
        <h1 className={styles.h1}>
          Congratulation, your question was submitted!
        </h1>
        <Link href={'/'}>
          <button className={`${styles.btn} ${styles.btnDark}`} type="button">
            Start another quiz!
          </button>
        </Link>
      </div>
    );

  return (
    <>
      <div className={styles.questionCnt}>
        <h1 className={styles.h1}>Add question to {category} Quiz</h1>
        {error && <div className={styles.questionError}>{error}</div>}
        <form onSubmit={onSubmit} className={styles.questionForm}>
          <div className={styles.inputAddQuestionForm}>
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              name="question"
              onChange={handleInputQuestionOrCorrectAnswer}
              value={formFields.question || ''}
              id="question"
              placeholder="Enter your question"
              required={true}
            />
          </div>
          {answersNumber.map((_, index) => (
            <div className={styles.inputAddQuestionForm} key={index}>
              <label htmlFor={`answer-${index}`}>Answer {index + 1}:</label>
              <input
                type="text"
                name={`answer-${index}`}
                onChange={(e) => handleInputAnswer(e, index)}
                id={`answer-${index}`}
                value={formFields.answers[index] || ''}
                placeholder="Enter your answer"
                required={true}
              />
            </div>
          ))}

          <div className={styles.inputAddQuestionForm}>
            <label htmlFor="correctAnswer:">Correct answer: </label>
            <select
              name="correctAnswer"
              onChange={handleInputQuestionOrCorrectAnswer}
              id="correctAnswer"
              defaultValue="noAnswer"
              required={true}
            >
              <option value="noAnswer" key="" disabled={true}>
                Please select and answer
              </option>

              {formFields.answers &&
                formFields.answers.map((answer, index) => (
                  <option
                    value={answer || ''}
                    key={`answer-${index}`}
                    onChange={handleInputQuestionOrCorrectAnswer}
                  >
                    {answer}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.btnForm}>
            <button
              className={`${styles.btn} ${styles.btnDark}`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Add question'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
