import { useRouter } from "next/router";
import Image from "next/legacy/image";
import styles from "../styles/Card.module.css";
import Link from "next/link";
import bkgLogo from "../public/img/logoGreenBkgG.svg";
import kantsekt from "../public/multilanguage/kantSekt.json";

function Mailto({ email, subject, body, ...props }) {
  return <a href={`mailto:${email}`}>{props.children}</a>;
}

const CardSekt = (props) => {
  const { locale, locales, asPath } = useRouter();
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          alt={props.alt ? props.alt : ""}
          src={props.source ? props.source : bkgLogo}
          objectFit={props.objectFit ? props.objectFit : "cover"}
          layout="fill"
        />
      </div>
      <div className={`${styles.text} ${styles.textSekt}`}>
        <h2>{props.zone ? props.zone : ""}</h2>
        <h1>{props.title ? props.title : ""}</h1>
        {props.person
          ? kantsekt.card
              .filter((p) => p.locale == locale)
              .map((e, i) => {
                return (
                  <p key={i}>{`${e.kontakt}: ${
                    props.person ? props.person : ""
                  }`}</p>
                );
              })
          : ""}
        {props.email ? (
          <Mailto email={props.email}>
            <p>{`Email: ${props.email}`}</p>
          </Mailto>
        ) : (
          ""
        )}
        {props.website ? (
          <a rel="noreferrer" target="_blank" href={props.website}>
            <p>{`Website: ${props.website.split("//")[1]}`}</p>
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CardSekt;
