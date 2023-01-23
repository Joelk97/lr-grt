import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MyHead from "../../components/MyHead";
import NavigatorPages from "../../components/navigatorPages";
import styles from "../../styles/SitWolf.module.css";

export default function SituationWolf() {
  return (
    <>
      <MyHead />
      <Header />
      <NavigatorPages />
      <main className={styles.main}>
        <span className={styles.date}>Situation Wolf</span>

        <div className={styles.articleContent}>
          <h1 className={styles.title}>Titel</h1>
          <p className={styles.abstract}>Abstract</p>
          <div className={styles.text}>
            <p>Text</p>
          </div>
        </div>
        <div className={styles.filesLinks}>
          <ul>
            <h2>Files</h2>
          </ul>
          <ul>
            <h2>Links</h2>
          </ul>
        </div>
        <div className={styles.images}>
          <ul></ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
