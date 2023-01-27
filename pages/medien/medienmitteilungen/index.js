import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MyHead from "../../../components/MyHead";
import NavigatorPages from "../../../components/navigatorPages";
import styles from "../../../styles/Medienmitteilungen.module.css";
import ListMedia from "../../../components/ListMedia";
import client from "../../../components/sanityCli";
import { useRouter } from "next/router";
import transformDate from "../../../components/transformDate";
import headComponents from "../../../public/multilanguage/head.json";
import Head from "next/head";

const queryMedienMitteilungen =
  "*[_type == 'medienMitteilungen'] | order(dateTime desc) []{dateTime,abstract,slug,title}";
const Medienmitteilungen = ({ medienMitt }) => {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";

  return (
    <>
      {headComponents.medienmitt
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
      <section className={styles.sectionMedienMitteilungen}>
        {medienMitt
          .filter((mitt) => mitt.slug?.[newLocale] != null)
          .map((m, i) => {
            return (
              <ListMedia
                key={i}
                articleData={transformDate(m?.dateTime)}
                articleTitle={m?.title?.[newLocale]}
                articleText={m?.abstract?.[newLocale]}
                href={`/${locale}/medien/medienmitteilungen/${m?.slug?.[newLocale].current}`}
              />
            );
          })}
      </section>
      <Footer />
    </>
  );
};
export default Medienmitteilungen;
export async function getStaticProps() {
  const medienMitt = await client.fetch(queryMedienMitteilungen);
  return {
    props: {
      medienMitt,
    },
  };
}
