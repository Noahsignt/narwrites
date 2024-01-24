import styles from "./page.module.css";
import Header from "./components/header";
import addData from "@/lib/firebase/firestore/addData";

export default function Home() {
  const handleForm = async () => {
    const data = {
      title: "dummy"
    }
    const { result, error } = await addData('articles', 'dummy', data)

    if (error) {
      return console.log(error)
    }
  }

  handleForm();

  return (
    <main className={styles.main}>
      <Header />
    </main>
  );
}
