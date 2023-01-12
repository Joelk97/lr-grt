import { useRouter } from "next/router";
import Image from "next/legacy/image";
import styles from "../styles/Card.module.css";

const Card = (props) => {
  const { locale, locales, asPath } = useRouter();
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image alt={props.alt} src={props.source} width={300} height={200} />
      </div>
      <div className={styles.text}>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Card;
