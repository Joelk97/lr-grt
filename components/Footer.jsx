import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/legacy/image";
import navElements from "../public/multilanguage/nav.json";
import Link from "next/link";

const Footer = (props) => {
  const { locale, locales, asPath } = useRouter();
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className={styles.container}>
      <div className={styles.copyright}>
        <Image alt="logo" src="/img/logoWhite.svg" width={180} height={70} />
        <p>{`© Copyright - ${year} VSLvGRT`}</p>
      </div>

      {navElements.nav
        .filter((l) => l.locale === locale)
        .map((e, i) => {
          return (
            <div key={i} className={`${styles.navigation}`}>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                <Link href="/verein"><h2>{e.association}</h2></Link>
                </li>
                <li>
                  <h3>{e.assoWhatWeDo}</h3>
                </li>
                <li>
                  <h3>{e.assoManag}</h3>
                </li>
                <li>
                  <h3>{e.assoBusiness}</h3>
                </li>
                <li>
                  <h3>{e.assoSections}</h3>
                </li>
              </ul>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                  <Link href="/medien"><h2>{e.media}</h2></Link>
                </li>
                <li>
                <Link href="/medien/medienmitteilungen"><h3>{e.mediaPress}</h3></Link>
                </li>
                <li>
                <Link href="/medien/news"><h3>{e.mediaNews}</h3></Link>
                </li>
                <li>
                  <Link href="/medien/studien"><h3>{e.mediaStudies}</h3></Link>
                </li>
              </ul>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                <Link href="/informationen"><h2>{e.info}</h2></Link>
                </li>
                <li>
                  <h3>{e.infoPolitics}</h3>
                </li>
                <li>
                  <h3>{e.infoActivities}</h3>
                </li>
                <li>
                  <h3>{e.infoSitWolf}</h3>
                </li>
              </ul>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                  <h2>{e.intern}</h2>
                </li>
                <li>
                  <h3>{e.internSanity}</h3>
                </li>
                <li>
                  <h3>{e.internDownload}</h3>
                </li>
              </ul>
            </div>
          );
        })}
    </footer>
  );
};

export default Footer;
