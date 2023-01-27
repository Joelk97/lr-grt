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

const querySituationWolf =
  "*[_type == 'situationWolf'] | order(dateTime desc) []{dateTime,abstract,slug,title, 'imagesUrl': images[].asset -> url}";
export default function SituationWolf({ situWolfArt }) {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  return (
    <>
      {headComponents.situaWolf
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
      <section className={styles.container}>
        {situWolfArt
          .filter((n) => n.slug?.[newLocale]?.current != null)
          .map((n, i) => {
            return (
              <Card
                alt="Article image"
                key={i}
                source={
                  n.imagesUrl?.[0] ? n.imagesUrl?.[0] : "/img/logoGreenBkgW.svg"
                }
                keyY={i}
                title={n.title?.[newLocale]}
                text={`${n.abstract?.[newLocale]?.substring(0, 150)}...`}
                link={`/informationen/situation-wolf/${n.slug?.[newLocale]?.current}`}
              />
            );
          })}
      </section>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const situWolfArt = await client.fetch(querySituationWolf);
  return {
    props: {
      situWolfArt,
    },
  };
}
