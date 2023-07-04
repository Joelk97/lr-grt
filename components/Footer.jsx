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
        <p>
          {`© Copyright - ${year} VSLvGRT`}
          <br></br>
          <Link href={"https://www.joelkuehl.ch/"}>
            by Kuehl Web developmemt
          </Link>
        </p>
      </div>

      {navElements.nav
        .filter((l) => l.locale === locale)
        .map((e, i) => {
          return (
            <div key={i} className={`${styles.navigation}`}>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                  <Link href="/medien">
                    <h2>{e.media}</h2>
                  </Link>
                </li>
              </ul>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                  <Link href="/verein">
                    <h2>{e.association}</h2>
                  </Link>
                </li>
              </ul>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                  <Link href="/informationen">
                    <h2>{e.info}</h2>
                  </Link>
                </li>
              </ul>
              <ul className={`${styles.navList} ${styles.navListAsso}`}>
                <li>
                  <h2>{e.intern}</h2>
                </li>
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://lr-grt.sanity.studio/`}
                  >
                    <h3>{e.internSanity}</h3>
                  </a>
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
