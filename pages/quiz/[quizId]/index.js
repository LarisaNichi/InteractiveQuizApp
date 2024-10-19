import { useRouter } from 'next/router';
import LayoutQuiz from '@/components/LayoutQuiz';
import { promises as fs } from 'fs';

export default function Quiz({ quizes }) {
  const router = useRouter();
  const { quizId } = router.query;
  const category = quizes.find((quiz) => quiz.id === Number(quizId)).category;

  return <LayoutQuiz category={category} quizId={quizId} />;
}

export async function getServerSideProps() {
  const file = await fs.readFile(
    process.cwd() + '/data/questions.json',
    'utf8'
  );
  const quizes = JSON.parse(file);
  return { props: { quizes } };
}
