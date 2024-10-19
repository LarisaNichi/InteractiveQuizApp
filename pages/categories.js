import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { promises as fs } from 'fs';

export default function Categories({ quizes }) {
  return (
    <>
      <h1 className={styles.h1}>Select your category to start with!</h1>
      <div className={styles.containerCnt}>
        <div
          className={`${styles.containerCateg} ${styles.containerCategActive}`}
        >
          {quizes.map(({ category, id }) => (
            <Link href={`/quiz/${id}`} key={id}>
              <span>{category}</span>
            </Link>
          ))}
        </div>

        <Link href="/">
          <button className={`${styles.btn} ${styles.btnLight}`}>
            Go back
          </button>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const file = await fs.readFile(
    process.cwd() + '/data/questions.json',
    'utf8'
  );
  const quizes = JSON.parse(file);
  return { props: { quizes } };
}
