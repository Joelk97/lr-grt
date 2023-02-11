import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MyHead from "../../../components/MyHead";
import NavigatorPages from "../../../components/navigatorPages";
import client from "../../../components/sanityCli";
import { useRouter } from "next/router";
import Card from "../../../components/Card";
import transformDate from "../../../components/transformDate";
import styles from "../../../styles/News.module.css";
import headComponents from "../../../public/multilanguage/head.json";
import Head from "next/head";
import ListMedia from "../../../components/ListMedia";

const queryNews = `*[_type=="katMedia" && slug.current == 'news'][0]{
  "de_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.de_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "fr_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.fr_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "it_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.it_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug}}
`;
export default function News({ news }) {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  return (
    <>
      {headComponents.news
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{`${element.title}`}</title>
              <meta name="description" content={element.description} />
            </Head>
          );
        })}
      <Header media="true" />
      <NavigatorPages />
      <div className={styles.container}>
        <h1 className={styles.title}>News</h1>
        <section className={styles.sectionNews}>
          {news?.[newLocale].map((article, i) => {
            return (
              <ListMedia
                key={i}
                articleData={transformDate(article.dateTime)}
                articleText={article?.abstract?.[newLocale].substring(0, 250)}
                articleTitle={article?.title?.[newLocale]}
                href={`/${locale}/medien/medienmitteilungen/${article.slug?.[newLocale]?.current}`}
              />
            );
          })}
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const news = await client.fetch(queryNews);
  return {
    props: {
      news,
    },
  };
}
