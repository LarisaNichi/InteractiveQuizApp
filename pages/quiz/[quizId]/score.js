import ShowResults from '@/components/ShowResults';
import { useState, useEffect } from 'react';

export default function Score() {
  const [localValue, setLocalValue] = useState({});

  useEffect(() => {
    let value;
    value = JSON.parse(localStorage.getItem('score')) || '';
    setLocalValue(value);
  }, []);

  const { category, questionsNumber, correctAnswers } = localValue;

  return (
    <ShowResults
      category={category}
      questionsNumber={questionsNumber}
      correctAnswers={correctAnswers}
    />
  );
}
