import { PortableText } from "@portabletext/react";
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
import Link from "next/link";

const pathQuery = `{'de':*[_type == "medienMitteilungen" && defined(slug.de_CH.current)].slug.de_CH.current, 
'it':*[_type == "medienMitteilungen" && defined(slug.it_CH.current)].slug.it_CH.current,
'fr':*[_type == "medienMitteilungen" && defined(slug.fr_CH.current)].slug.fr_CH.current}`;
const queryMitteilung = `*[_type == "medienMitteilungen" && (slug.it_CH.current == $slug || slug.de_CH.current == $slug || slug.fr_CH.current == $slug)][0]{
  dateTime,
  title,
  abstract,
  BlockContent,
  files,
  "filesUrl": files[].asset -> url
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
      <MyHead />
      <Header media="true" />
      <main className={styles.main}>
        <span className={styles.date}>
          Medienmitteilung - {transformDate(mitteilung.dateTime)}
        </span>
        <div className={styles.articleContent}>
          <h1 className={styles.title}>{mitteilung?.title?.[newLocale]}</h1>
          <p className={styles.abstract}>{mitteilung?.abstract?.[newLocale]}</p>
          <div className={styles.text}>
            {mitteilung?.BlockContent.map((block, i) => {
              return <PortableText key={i} value={block?.[newLocale]} />;
            })}
          </div>
        </div>
        <div className={styles.filesLinks}>
          <ul>
            <h2>Files</h2>
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
          <ul>
            <h2>Links</h2>
            <li>Link 1</li>
            <li>Link 2</li>
          </ul>
        </div>
        <div className={styles.images}>
          <ul>
            <li>
              <Image
                alt="Img"
                layout="fill"
                objectFit="cover"
                src="https://picsum.photos/300/200"
              />
            </li>
            <li>
              <Image
                layout="fill"
                objectFit="cover"
                alt="Img"
                src="https://picsum.photos/300/200"
              />
            </li>
          </ul>
        </div>
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
