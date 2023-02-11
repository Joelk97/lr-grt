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
import homePage from "../../../public/multilanguage/homePage.json";
import { BsMegaphoneFill } from "react-icons/bs";

const queryMedienMitteilungen = `*[_type=="katMedia" && slug.current == 'medienmitteilungen'][0]{
  "de_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.de_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "fr_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.fr_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "it_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.it_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug}}
`;
const iconStyle = { color: "#000", height: "100%", marginRight: "2rem" };

const Medienmitteilungen = ({ medienMitt }) => {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";

  return (
    <>
      {console.log(medienMitt)}
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
      <div className={styles.container}>
        {homePage.titles
          .filter((l) => l.locale === locale)
          .map((element, i) => {
            return (
              <h1 className={styles.title} key={i}>
                <BsMegaphoneFill style={iconStyle} />
                {element.media}
              </h1>
            );
          })}
      </div>
      <section className={styles.sectionMedienMitteilungen}>
        {medienMitt?.[newLocale].map((article, i) => {
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
