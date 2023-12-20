import { PortableText } from "@portabletext/react";
import { useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MyHead from "../../../components/MyHead";
import styleHome from "../../../styles/Home.module.css";
import styles from "../../../styles/Slug.module.css";
import Image from "next/legacy/image";
import client from "../../../components/sanityCli";
import transformDate from "../../../components/transformDate";
import mitt from "next/dist/shared/lib/mitt";
import { useRouter } from "next/router";
import { FaFileDownload } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import headComponents from "../../../public/multilanguage/head.json";
import Head from "next/head";

import medienElements from "../../../public/multilanguage/medien.json";
import NavigatorPages from "../../../components/navigatorPages";
import Medienmitteilungen from ".";

const pathQuery = `{'de':*[_type == "artikelMedia" && defined(slug.de_CH.current)].slug.de_CH.current, 
'it':*[_type == "artikelMedia" && defined(slug.it_CH.current)].slug.it_CH.current,
'fr':*[_type == "artikelMedia" && defined(slug.fr_CH.current)].slug.fr_CH.current}`;
const queryMitteilung = `*[_type == "artikelMedia" && (slug.it_CH.current == $slug || slug.de_CH.current == $slug || slug.fr_CH.current == $slug)][0]{
  dateTime,
  title,
  abstract,
  BlockContent,
  files,
  "filesUrl": files[].asset -> url,
  someLinks,
  slug,
  fileLanguages,
  "imagesUrl": images[].asset -> url
}`;
const iconStyle = { color: "#87BB3F", marginRight: "10" };
export default function Mitteilung({ mitteilung }) {
  const { locale, locales, asPath } = useRouter();
  const router = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";

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
      {headComponents.medienmitt
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>
                {mitteilung?.title?.[newLocale]
                  ? mitteilung?.title?.[newLocale]
                  : element.title}
              </title>
              <meta
                name="description"
                content={
                  mitteilung?.abstract?.[newLocale]
                    ? mitteilung?.abstract?.[newLocale]
                    : element.description
                }
              />
            </Head>
          );
        })}
      <Header media="true" />
      <NavigatorPages slug={mitteilung?.slug?.[newLocale]?.current} />

      <main className={styles.main}>
        {medienElements.mitteilung
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return (
              <span key={i} className={styles.date}>
                {e.article} - {transformDate(mitteilung.dateTime)}
              </span>
            );
          })}

        <div className={styles.articleContent}>
          <h1 className={styles.title}>{mitteilung?.title?.[newLocale]}</h1>
          <p className={styles.abstract}>{mitteilung?.abstract?.[newLocale]}</p>
          {mitteilung?.BlockContent != null && (
            <div className={styles.text}>
              {mitteilung?.BlockContent.map((block, i) => {
                return <PortableText key={i} value={block?.[newLocale]} />;
              })}
            </div>
          )}
        </div>
        <div className={styles.filesLinks}>
          {mitteilung.files &&
            medienElements.medienIntro
              .filter((l) => l.locale == locale)
              .map((element, index) => {
                return (
                  <ul key={index}>
                    <h2>{element.files}</h2>
                    {mitteilung.files.map((file, i) => {
                      return (
                        <li key={i}>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://cdn.sanity.io/files/imbz32xt/production/${
                              file.asset._ref.split("-")[1]
                            }.pdf`}
                          >
                            <FaFileDownload style={iconStyle} />
                            {file.title?.[newLocale]
                              ? file.title?.[newLocale]
                              : file.caption}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
          {mitteilung.fileLanguages &&
            medienElements.medienIntro
              .filter((l) => l.locale == locale)
              .map((element, index) => {
                return (
                  <ul key={index}>
                    <h2>{element.files}</h2>
                    {mitteilung.fileLanguages?.[newLocale]?.map((file, i) => {
                      return (
                        <li key={i}>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://cdn.sanity.io/files/imbz32xt/production/${
                              file.asset._ref.split("-")[1]
                            }.pdf`}
                          >
                            <FaFileDownload style={iconStyle} />
                            {file.title?.[newLocale]
                              ? file.title?.[newLocale]
                              : file.caption}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}

          {mitteilung.someLinks &&
            medienElements.medienIntro
              .filter((l) => l.locale == locale)
              .map((element, index) => {
                return (
                  <ul key={index}>
                    <h2>{element.link}</h2>
                    {mitteilung.someLinks != null &&
                      mitteilung.someLinks.map((link, i) => {
                        return (
                          <li key={i}>
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={link?.link}
                            >
                              <AiOutlineLink style={iconStyle} />
                              {link?.name?.[newLocale]
                                ? link?.name?.[newLocale]
                                : link?.link}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                );
              })}
        </div>
        {mitteilung?.imagesUrl != null ? (
          <div className={styles.images}>
            <ul>
              {mitteilung?.imagesUrl?.map((image, i) => {
                return (
                  <Link key={i} href={image}>
                    <li key={i}>
                      <Image
                        alt={`Image ${i}`}
                        layout="fill"
                        objectFit="cover"
                        src={image}
                        placeholder="blur"
                        blurDataURL="/img/logoGreenBkgG.svg"
                      />
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const response = await client.fetch(pathQuery);
  const merged = [...response.de, ...response.fr, ...response.it];
  const paths = merged.map((slug) => ({
    params: { slug },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const mitteilung = await client.fetch(queryMitteilung, { slug });
  return {
    props: {
      mitteilung,
    },
  };
}
