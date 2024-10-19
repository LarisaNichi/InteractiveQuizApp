import { useRouter } from 'next/router';
import LayoutQuiz from '@/components/LayoutQuiz';
import { quizes } from '@/pages/Dates/questions';

export default function Quiz() {
  const router = useRouter();
  const { quizId } = router.query;
  const category = quizes.find((quiz) => quiz.id === Number(quizId)).category;
  return <LayoutQuiz category={category} quizId={quizId} />;
}
