import { useRouter } from "next/router";
import MyHead from "../components/MyHead.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styleHome from "../styles/Home.module.css";
import styles from "../styles/Informationen.module.css";
import NavigatorPages from "../components/navigatorPages.jsx";
import Image from "next/legacy/image";
import infromationenElements from "../public/multilanguage/informationen.json";
import Intro from "../components/Intro.jsx";
import Card from "../components/Card.jsx";
import ListMedia from "../components/ListMedia.jsx";
import client from "../components/sanityCli.js";

const queryInfoPage =
  "*[_type=='infoPage']|order(_createdAt asc)[0]{title, title2, intro, intro2, 'imageBkg': bkgImageIntro.asset -> url,}";

export default function UeberUns({ infoPage }) {
  const { locale, loales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  return (
    <>
      <MyHead />
      <Header informationen="true" />
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={infoPage.imageBkg}
            layout="fill"
            objectFit="cover"
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
                <h1 className={styleHome.titlesSections}>
                  {infoPage.title2?.[newLocale]}
                </h1>
                <p className={styles.introText2}>
                  {infoPage.intro2?.[newLocale]}
                </p>
                <div className={styleHome.cards}>
                  <Card
                    source="/img/wolf1.jpg"
                    alt="Abbildung Wolf"
                    title={e.sitWolfTitle}
                    text={e.sitWolfText}
                    link="/informationen/situation-wolf"
                  />
                  <Card
                    source="/img/politics1.jpg"
                    alt="Abbildung Politik"
                    title={e.politicsTitle}
                    text={e.politicsText}
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
