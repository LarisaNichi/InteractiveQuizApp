import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { promises as fs } from 'fs';

export default function Home({ quizes }) {
  return (
    <>
      <Head>
        <title className="hd-1">Frontend Quiz</title>
        <meta name="description" content="Quiz for HTML / CSS / JS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className={styles.h1}>Test your Frontend knowledge!</h1>
      <div className={styles.containerCnt}>
        <div className={styles.containerCateg}>
          {quizes.map(({ category, id }) => (
            <span key={id}>{category}</span>
          ))}
        </div>
        <Link href="/categories">
          <button className={`${styles.btn} ${styles.btnDark}`}>
            Start your quiz
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
