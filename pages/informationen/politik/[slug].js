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
import { useRouter } from "next/router";
import { FaFileDownload } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import medienElements from "../../../public/multilanguage/medien.json";
import NavigatorPages from "../../../components/navigatorPages";
import headComponents from "../../../public/multilanguage/head.json";
import Head from "next/head";

const pathQuery = `{'de':*[_type == "politik" && defined(slug.de_CH.current)].slug.de_CH.current, 
'it':*[_type == "politik" && defined(slug.it_CH.current)].slug.it_CH.current,
'fr':*[_type == "politik" && defined(slug.fr_CH.current)].slug.fr_CH.current}`;
const queryPolitik = `*[_type == "politik" && (slug.it_CH.current == $slug || slug.de_CH.current == $slug || slug.fr_CH.current == $slug)][0]{
  dateTime,
  title,
  abstract,
  BlockContent,
  files,
  "filesUrl": files[].asset -> url,
  someLinks,
  slug,
  "imagesUrl": images[].asset -> url,
  category,
  "kategorie": *[_type == "catPolitics" && _id == ^.category._ref]
}`;
const iconStyle = { color: "#87BB3F", marginRight: "10" };
export default function PolitikArt({ artPolitik }) {
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
      {headComponents.politik
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>
                {artPolitik?.title?.[newLocale]
                  ? artPolitik?.title?.[newLocale]
                  : element.title}
              </title>
              <meta
                name="description"
                content={
                  artPolitik?.abstract?.[newLocale]
                    ? artPolitik?.abstract?.[newLocale]
                    : element.description
                }
              />
            </Head>
          );
        })}
      <Header informationen="true" />
      <NavigatorPages slug={artPolitik?.slug?.[newLocale]?.current} />

      <main className={styles.main}>
        <span className={styles.date}>
          {artPolitik?.kategorie?.[0]?.category?.[newLocale]} -
          {transformDate(artPolitik.dateTime)}
        </span>

        <div className={styles.articleContent}>
          <h1 className={styles.title}>{artPolitik?.title?.[newLocale]}</h1>
          <p className={styles.abstract}>{artPolitik?.abstract?.[newLocale]}</p>
          <div className={styles.text}>
            {artPolitik?.BlockContent?.map((block, i) => {
              return <PortableText key={i} value={block?.[newLocale]} />;
            })}
          </div>
        </div>
        <div className={styles.filesLinks}>
          {artPolitik.files != null ? (
            <ul>
              <h2>Files</h2>
              {artPolitik.files != null &&
                artPolitik.files?.map((file, i) => {
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
          ) : (
            ""
          )}
          {artPolitik.someLinks != null ? (
            <ul>
              <h2>Links</h2>
              {artPolitik.someLinks != null &&
                artPolitik.someLinks?.map((link, i) => {
                  return (
                    <li key={i}>
                      <a rel="noreferrer" target="_blank" href={link?.link}>
                        <AiOutlineLink style={iconStyle} />
                        {link?.name?.[newLocale]}
                      </a>
                    </li>
                  );
                })}
            </ul>
          ) : (
            ""
          )}
        </div>
        {artPolitik?.imagesUrl != null ? (
          <div className={styles.images}>
            <ul>
              {artPolitik?.imagesUrl?.map((image, i) => {
                return (
                  <Link key={i} href={image}>
                    <li key={i}>
                      <Image
                        alt={`Image ${i}`}
                        layout="fill"
                        objectFit="cover"
                        src={image}
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
  const artPolitik = await client.fetch(queryPolitik, { slug });
  return {
    props: {
      artPolitik,
    },
  };
}
