import styles from "./page.module.css";
import Header from "./components/header";
import addData from "@/lib/firebase/firestore/addData";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
    </main>
  );
}
