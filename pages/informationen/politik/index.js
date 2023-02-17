import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MyHead from "../../../components/MyHead";
import NavigatorPages from "../../../components/navigatorPages";
import client from "../../../components/sanityCli";
import { useRouter } from "next/router";
import Card from "../../../components/Card";
import styles from "../../../styles/News.module.css";
import headComponents from "../../../public/multilanguage/head.json";
import Head from "next/head";
import ListMedia from "../../../components/ListMedia";
import transformDate from "../../../components/transformDate";

const queryPolitik = `*[_type == 'politik'] | order(dateTime desc) []{category,'slugCat': *[_type == "catPolitics" && _id == ^.category._ref][0],dateTime,abstract,slug,title, 'imagesUrl': images[].asset -> url}
  `;
const queryCatPolitik = `*[_type == "catPolitics"][]`;
export default function Politik({ politik, catPolitik }) {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  const internationale = politik.filter(
    (n) => n.slugCat?.slug?.de_CH?.current == "international"
  );
  const nationale = politik.filter(
    (n) => n.slugCat?.slug?.de_CH?.current == "national"
  );
  const kantonale = politik.filter(
    (n) => n.slugCat?.slug?.de_CH?.current == "kantonal"
  );
  return (
    <>
      {headComponents.politik
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{`${element.title}`}</title>
              <meta name="description" content={element.description} />
            </Head>
          );
        })}
      <Header informationen="true" />
      <NavigatorPages />

      <div className={styles.container}>
        {internationale.length > 0 && (
          <section className={styles.sectionNews}>
            {catPolitik
              .filter((n) => n.slug?.de_CH?.current == "international")
              .map((e, i) => {
                return (
                  <h1 className={styles.title} key={i}>
                    {e.category?.[newLocale]}
                  </h1>
                );
              })}
            {politik
              .filter((n) => n.slugCat?.slug?.de_CH?.current == "international")
              .map((a, i) => {
                return (
                  <ListMedia
                    key={i}
                    articleData={transformDate(a.dateTime)}
                    articleText={a?.abstract?.[newLocale]}
                    articleTitle={a?.title?.[newLocale]}
                  />
                );
              })}
          </section>
        )}
        {nationale.length > 0 && (
          <section className={styles.sectionNews}>
            {catPolitik
              .filter((n) => n.slug?.de_CH?.current == "national")
              .map((e, i) => {
                return (
                  <h1 className={styles.title} key={i}>
                    {e.category?.[newLocale]}
                  </h1>
                );
              })}
            {politik
              .filter((n) => n.slugCat?.slug?.de_CH?.current == "national")
              .map((a, i) => {
                return (
                  <ListMedia
                    key={i}
                    articleData={transformDate(a.dateTime)}
                    articleText={a?.abstract?.[newLocale]}
                    articleTitle={a?.title?.[newLocale]}
                  />
                );
              })}
          </section>
        )}
        {kantonale.length > 0 && (
          <section className={styles.sectionNews}>
            {catPolitik
              .filter((n) => n.slug?.de_CH?.current == "kantonal")
              .map((e, i) => {
                return (
                  <h1 className={styles.title} key={i}>
                    {e.category?.[newLocale]}
                  </h1>
                );
              })}
            {politik
              .filter((n) => n.slugCat?.slug?.de_CH?.current == "kantonal")
              .map((a, i) => {
                return (
                  <ListMedia
                    key={i}
                    articleData={transformDate(a.dateTime)}
                    articleText={a?.abstract?.[newLocale]}
                    articleTitle={a?.title?.[newLocale]}
                  />
                );
              })}
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const politik = await client.fetch(queryPolitik);
  const catPolitik = await client.fetch(queryCatPolitik);
  return {
    props: {
      politik,
      catPolitik,
    },
  };
}
