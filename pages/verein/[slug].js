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
import { useRouter } from "next/router";
import { FaFileDownload } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import vereinElements from "../../public/multilanguage/verein.json";
import NavigatorPages from "../../components/navigatorPages";
import headComponents from "../../public/multilanguage/head.json";
import Head from "next/head";

const pathQuery = `{'de':*[_type == "vereinUnterKat" && defined(slug.de_CH.current)].slug.de_CH.current, 
'it':*[_type == "vereinUnterKat" && defined(slug.it_CH.current)].slug.it_CH.current,
'fr':*[_type == "vereinUnterKat" && defined(slug.fr_CH.current)].slug.fr_CH.current}`;
const queryUnderCatVer = `*[_type == "vereinUnterKat" && (slug.it_CH.current == $slug || slug.de_CH.current == $slug || slug.fr_CH.current == $slug)][0]{

  title,
  abstract,
  content,
  files,
  "filesUrl": files[].asset -> url,
  slug,
  "imagesUrl": images[].asset -> url,

}`;
const iconStyle = { color: "#87BB3F", marginRight: "10" };
export default function PolitikArt({ underCatVer }) {
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
      {headComponents.verein
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
      <NavigatorPages slug={underCatVer?.slug?.[newLocale]?.current} />

      <main className={styles.main}>
        {vereinElements.vereinUnterKat
          .filter((p) => p.locale == locale)
          .map((e, i) => {
            return (
              <span key={i} className={styles.date}>
                {`${e.title} - ${underCatVer?.title?.[newLocale]}`}
              </span>
            );
          })}

        <div className={styles.articleContent}>
          <h1 className={styles.title}>{underCatVer?.title?.[newLocale]}</h1>
          <p className={styles.abstract}>
            {underCatVer?.abstract?.[newLocale]}
          </p>
          <div className={styles.text}>
            <PortableText value={underCatVer?.content?.[newLocale]} />
          </div>
        </div>
        <div className={styles.filesLinks}>
          {underCatVer.files != null ? (
            <ul>
              <h2>Files</h2>
              {underCatVer.files != null &&
                underCatVer.files?.map((file, i) => {
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
        </div>
        {underCatVer?.imagesUrl != null ? (
          <div className={styles.images}>
            <ul>
              {underCatVer?.imagesUrl?.map((image, i) => {
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
  const underCatVer = await client.fetch(queryUnderCatVer, { slug });
  return {
    props: {
      underCatVer,
    },
  };
}
