import { useRouter } from "next/router";
import MyHead from "../components/MyHead.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styleHome from "../styles/Home.module.css";
import styles from "../styles/Verein.module.css";
import sheeps1 from "../public/img/sheeps1.jpg";
import Image from "next/legacy/image";
import vereinElements from "../public/multilanguage/verein.json";
import Intro from "../components/Intro.jsx";
import Card from "../components/Card.jsx";
import client from "../components/sanityCli.js";
import NavigatorPages from "../components/navigatorPages.jsx";

const queryVereinPage =
  "*[_type=='vereinPage']|order(_createdAt asc)[0]{title, title2, intro, intro2, 'imageBkg': bkgImageIntro.asset -> url,}";

export default function UeberUns({ vereinPage }) {
  const { locale, loales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";

  return (
    <>
      <MyHead />
      <Header verein="true" />
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={vereinPage.imageBkg}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <Intro
          titolo={vereinPage.title?.[newLocale]}
          slogan1={vereinPage.intro?.[newLocale]}
        />
        <NavigatorPages />
        <div className={styles.intro2}>
          <h1 className={styleHome.titlesSections}>
            {vereinPage.title2?.[newLocale]}
          </h1>
          <p className={styles.introText2}>{vereinPage.intro2?.[newLocale]}</p>
        </div>
        {vereinElements.assoCat
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return (
              <section key={i} className={styles.containerCards}>
                <div className={styleHome.cards}>
                  <Card
                    title={e.assoWhatWeDo}
                    source="/img/logoGreenBkgG.svg"
                    text={e.assoWhatWeDoText}
                  />
                  <Card
                    title={e.assoManag}
                    source="/img/logoGreenBkgG.svg"
                    text={e.assoManagText}
                  />
                </div>
                <div className={styleHome.cards}>
                  <Card
                    title={e.assoBusiness}
                    source="/img/logoGreenBkgG.svg"
                    text={e.assoBusinessText}
                  />
                  <Card
                    title={e.assoSections}
                    source="/img/logoGreenBkgG.svg"
                    text={e.assoSectionsText}
                  />
                </div>
              </section>
            );
          })}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const vereinPage = await client.fetch(queryVereinPage);
  return {
    props: {
      vereinPage,
    },
  };
}
