import styles from '../styles/Home.module.css';

export default function AnswerMessage({ isCorrectAnswer, correctAnswer }) {
  let message = '';
  message = isCorrectAnswer ? (
    'Good job!'
  ) : (
    <>
      Wrong answer! The correct answer is:
      <span className={styles.questionMessageAnswer}>{correctAnswer}</span>
    </>
  );
  return <div className={styles.questionMessage}>{message}</div>;
}
