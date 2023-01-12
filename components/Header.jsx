import styles from "../styles/Header.module.css";
import headerComp from "../public/multilanguage/header.json";
import { useRouter } from "next/router";
import logoWhite from "../public/img/logoGreen.svg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { locale, locales, asPath } = useRouter();
  return (
    <header className={styles.header}>
      {headerComp.headerComponents
        .filter((l) => l.locale === locale)
        .map((component, i) => {
          return (
            <div key={i} className={styles.container}>
              <div className={styles.logoImage}>
                <Link href={`/`}>
                  <Image alt="Logo" src={logoWhite} />
                </Link>
              </div>
              <ul className={`${styles.primaryNav} ${styles.navElements}`}>
                <li>{component.media}</li>
                <li>{component.assotiation}</li>
                <li>{component.information}</li>
              </ul>
              <ul className={`${styles.secondaryNav} ${styles.navElements}`}>
                <li>{component.contact}</li>
                <li>{component.events}</li>
              </ul>
              <ul className={`${styles.languages} ${styles.navElements}`}>
                {locales.map((l, i) => {
                  return (
                    <li
                      className={l == locale ? styles.selectedLang : ""}
                      key={i}
                    >
                      <Link href={asPath} locale={l}>
                        {l.substring(0, 2).toUpperCase()}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </header>
  );
};

export default Header;
