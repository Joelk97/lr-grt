import { useRouter } from "next/router";
import Image from "next/legacy/image";
import styles from "../styles/Card.module.css";
import Link from "next/link";

const Card = (props) => {
  const { locale, locales, asPath } = useRouter();
  return (
    <Link
      key={props.keyY ? props.keyY : ""}
      href={props.link ? props.link : "#"}
    >
      <div className={styles.card}>
        <div className={styles.image}>
          <Image alt={props.alt} src={props.source} width={300} height={200} />
        </div>
        <div className={styles.text}>
          <h1>{props.title}</h1>
          <p>{props.text}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
