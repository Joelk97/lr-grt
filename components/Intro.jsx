import Image from "next/legacy/image";
import styles from "../styles/Intro.module.css";

const Intro = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentIntro}>
        <h1 className={styles.title}>{props.titolo}</h1>
        <h2 className={`${styles.slogans} ${styles.slogan1}`}>
          {props.slogan1}
        </h2>
        <h2 className={`${styles.slogans} ${styles.slogan2}`}>
          {props.slogan2}
        </h2>
        <h3 className={styles.button}>{props.button}</h3>
      </div>
    </div>
  );
};

export default Intro;
