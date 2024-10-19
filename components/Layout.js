import styles from '../styles/Home.module.css';

export default function Layout({ children }) {
  return (
    <main className={styles.main}>
      <div className={styles.containerApp}>{children}</div>
    </main>
  );
}
