import { PortableText } from "@portabletext/react";
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MyHead from "../../components/MyHead";
import styleHome from "../../styles/Home.module.css";
import styles from "../../styles/Slug.module.css";
import Image from "next/legacy/image";
import client from "../../components/sanityCli";
import transformDate from "../../components/transformDate";
import mitt from "next/dist/shared/lib/mitt";
import { useRouter } from "next/router";
import { FaFileDownload } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import headComponents from "../../public/multilanguage/head.json";
import Head from "next/head";
import medienElements from "../../public/multilanguage/medien.json";
import NavigatorPages from "../../components/navigatorPages";
import refToLink from "../../components/refToLink";

const queryVereinPage =
  "*[_type=='vereinPage']|order(_createdAt asc)[0]{statutesFile, statutesContent,statutesIntro, statutesSlug, statutesTitle, statutesDate, cardWhatWeDoText,cardWhatWeDoTitle, title, title2, intro, intro2, 'imageBkg': bkgImageIntro.asset -> url,}";

const iconStyle = { color: "#87BB3F", marginRight: "10" };
export default function Statuten({ vereinPage }) {
  const { locale, locales, asPath } = useRouter();
  const router = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  /*news?.BlockContent?.[0]?.fr_CH?
    .filter((e) => e._type == "image")
    .map((image, i) => {
      return console.log(refToLink(image.asset._ref));
    });*/
  if (router.isFallback) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }
  return (
    <>
      {/* TODO: DELETE IMAGES AND MAP OVER ARRAY */}
      {headComponents.statuten
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{`${element.title}`}</title>
              <meta name="description" content={element.description} />
            </Head>
          );
        })}
      <Header verein="true" />
      <NavigatorPages />
      <main className={styles.main}>
        <span className={styles.date}>
          {vereinPage?.statutesTitle?.[newLocale]} -{" "}
          {transformDate(vereinPage.statutesDate)}
        </span>

        <div className={styles.articleContent}>
          <div className={styles.text}>
            <PortableText value={vereinPage?.statutesContent?.[newLocale]} />
          </div>
        </div>
        <div className={styles.filesLinks}>
          <ul>
            <li>
              {" "}
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://cdn.sanity.io/files/imbz32xt/production/${
                  vereinPage?.statutesFile?.asset._ref.split("-")[1]
                }.pdf`}
              >
                <FaFileDownload style={iconStyle} />
                {`PDF ${vereinPage.statutesTitle?.[newLocale]}`}
              </a>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const vereinPage = await client.fetch(queryVereinPage);
  return {
    props: {
      vereinPage,
    },
  };
}
