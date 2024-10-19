import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';

export default function AddQuestion() {
  const [localValue, setLocalValue] = useState({});
  const [formFields, setFormFields] = useState({
    question: '',
    answers: new Array(3),
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

  function handleInputQuestion(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  }

  function handleInputAnswer(e, index) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const answersValues = formFields[fieldName];
    answersValues[index] = fieldValue;

    setFormFields((prevState) => ({
      ...prevState,
      [fieldName]: answersValues,
    }));
  }

  function handleCorrectAnswer(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormFields((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  }

  function isValidJSON(str) {
    try {
      JSON.parse(str);
      // console.log("it's a JSON type");
      return true;
    } catch (e) {
      // console.log("it's not a JSON type");
      return false;
    }
  }
  function parseJSON(str) {
    return isValidJSON(str) ? JSON.parse(str) : str;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      Object.entries(formFields).forEach(([key, value]) => {
        // (Array.isArray(value)
        if (typeof value !== 'string') {
          formData.set(key, JSON.stringify(value));
        } else {
          formData.set(key, value);
        }
      });
      // const value = Object.fromEntries(formData.entries());
      // console.log(value);
      const formDataJSONObject = [...formData.entries()].reduce(
        (acc, [key, value]) => {
          acc[parseJSON(key)] = parseJSON(value);
          return acc;
        },
        {}
      );

      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(formDataJSONObject),
      });

      setFormSuccess(true);
      setFormFields({
        question: '',
        answers: new Array(3),
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
              onChange={handleInputQuestion}
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
                name="answers"
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
              onChange={handleCorrectAnswer}
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
                    onChange={handleCorrectAnswer}
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
