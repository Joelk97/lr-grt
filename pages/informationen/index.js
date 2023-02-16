import { useRouter } from "next/router";
import MyHead from "../../components/MyHead.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import styleHome from "../../styles/Home.module.css";
import styles from "../../styles/Informationen.module.css";
import NavigatorPages from "../../components/navigatorPages.jsx";
import Image from "next/legacy/image";
import infromationenElements from "../../public/multilanguage/informationen.json";
import Intro from "../../components/Intro.jsx";
import Card from "../../components/Card.jsx";
import ListMedia from "../../components/ListMedia.jsx";
import client from "../../components/sanityCli.js";
import headComponents from "../../public/multilanguage/head.json";
import Head from "next/head";
import { HiInformationCircle } from "react-icons/hi";
const queryInfoPage =
  "*[_type=='infoPage']|order(_createdAt asc)[0]{title, title2, intro, intro2, 'imageBkg': bkgImageIntro.asset -> url, 'imageWolf': imageSitWolf.asset -> url,  'imagePol': imagePolitik.asset -> url }";
const iconStyle = { color: "#000", height: "100%", marginRight: "2rem" };

export default function Informationen({ infoPage }) {
  const { locale, loales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  return (
    <>
      {headComponents.informationen
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
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={infoPage.imageBkg}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />
        </div>

        <Intro
          titolo={infoPage.title?.[newLocale]}
          slogan1={infoPage.intro?.[newLocale]}
        />
        <NavigatorPages />
        {infromationenElements.content
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return (
              <section className={styles.sectionInformations} key={i}>
                {infoPage.title2?.[newLocale] != null && (
                  <h1 className={styleHome.titlesSections}>
                    <HiInformationCircle style={iconStyle} />
                    {infoPage.title2?.[newLocale]}
                  </h1>
                )}
                {infoPage.title2?.[newLocale] != null && (
                  <p className={styles.introText2}>
                    {infoPage.intro2?.[newLocale]}
                  </p>
                )}

                <div className={`${styleHome.cards} ${styles.cardsInfo}`}>
                  <Card
                    source={infoPage?.imageWolf}
                    alt="Abbildung Wolf"
                    title={e.sitWolfTitle}
                    text={e.sitWolfText}
                    link="/informationen/situation-wolf"
                  />
                  <Card
                    source={infoPage?.imagePol}
                    alt="Abbildung Politik"
                    title={e.politicsTitle}
                    text={e.politicsText}
                    link="/informationen/politik"
                  />
                </div>
              </section>
            );
          })}
        {infromationenElements.content
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return (
              <section key={i} className={styles.sectionActivities}>
                <h1 className={styleHome.titlesSections}>
                  {e.activitiesTitle}
                </h1>
                <ListMedia
                  articleData="24.10.2022"
                  articleText="Aliquip ea ipsum ex veniam laborum cupidatat ad ut sint laborum voluptate ea aliquip. Reprehenderit dolore sint id elit minim non consectetur. Labore esse sit labore in tempor duis voluptate. Consectetur pariatur mollit mollit est laborum irure. Excepteur anim reprehenderit esse magna ullamco adipisicing velit voluptate."
                  articleTitle="Deserunt culpa qui qui nulla in laboris id ex."
                />
                <ListMedia
                  articleData="24.10.2022"
                  articleText="Aliquip ea ipsum ex veniam laborum cupidatat ad ut sint laborum voluptate ea aliquip. Reprehenderit dolore sint id elit minim non consectetur. Labore esse sit labore in tempor duis voluptate. Consectetur pariatur mollit mollit est laborum irure. Excepteur anim reprehenderit esse magna ullamco adipisicing velit voluptate."
                  articleTitle="Deserunt culpa qui qui nulla in laboris id ex."
                />
                <ListMedia
                  articleData="24.10.2022"
                  articleText="Aliquip ea ipsum ex veniam laborum cupidatat ad ut sint laborum voluptate ea aliquip. Reprehenderit dolore sint id elit minim non consectetur. Labore esse sit labore in tempor duis voluptate. Consectetur pariatur mollit mollit est laborum irure. Excepteur anim reprehenderit esse magna ullamco adipisicing velit voluptate."
                  articleTitle="Deserunt culpa qui qui nulla in laboris id ex."
                />
                <br />
                <h2 className={styleHome.greenButton}>Alle Aktivitäten</h2>
              </section>
            );
          })}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const infoPage = await client.fetch(queryInfoPage);
  return {
    props: {
      infoPage,
    },
  };
}
