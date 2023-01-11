import styles from "../styles/Header.module.css";
import headerComp from "../public/multilanguage/header.json";
import { useRouter } from "next/router";
import logoWhite from "../public/img/logoWhite.svg";
import Image from "next/image";

const Header = () => {
  const { locale, locales, asPath } = useRouter();
  return (
    <header className={styles.header}>
      {headerComp.headerComponents
        .filter((l) => l.locale === locale)
        .map((component, i) => {
          return (
            <div key={i} className={styles.container}>
              <Image src={logoWhite} />
              <ul className={`${styles.primaryNav} ${styles.navElements}`}>
                <li>{component.assotiation}</li>
                <li>{component.media}</li>
                <li>{component.information}</li>
              </ul>
              <ul className={`${styles.secondaryNav} ${styles.navElements}`}>
                <li>{component.contact}</li>
                <li>{component.events}</li>
              </ul>
            </div>
          );
        })}
    </header>
  );
};

export default Header;
