import { useRouter } from "next/router";
import MyHead from "../../components/MyHead.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import styleHome from "../../styles/Home.module.css";
import styles from "../../styles/Verein.module.css";
import sheeps1 from "../../public/img/sheeps1.jpg";
import Image from "next/legacy/image";
import vereinElements from "../../public/multilanguage/verein.json";
import Intro from "../../components/Intro.jsx";
import Card from "../../components/Card.jsx";
import client from "../../components/sanityCli.js";
import NavigatorPages from "../../components/navigatorPages.jsx";
import headComponents from "../../public/multilanguage/head.json";
import Head from "next/head";

const queryVereinPage =
  "*[_type=='vereinPage']|order(_createdAt asc)[0]{statutesIntro, statutesSlug, statutesTitle, statutesDate, cardWhatWeDoText,cardWhatWeDoTitle, title, title2, intro, intro2, 'imageBkg': bkgImageIntro.asset -> url,}";

export default function UeberUns({ vereinPage }) {
  const { locale, loales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";

  return (
    <>
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
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={vereinPage.imageBkg}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
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
                <Card
                  title={vereinPage?.cardWhatWeDoTitle?.[newLocale]}
                  source="/img/logoGreenBkgG.svg"
                  text={vereinPage?.cardWhatWeDoText?.[newLocale]}
                />
                <Card
                  title={e.assoManag}
                  source="/img/logoGreenBkgG.svg"
                  text={e.assoManagText}
                />

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
                <Card
                  title={vereinPage.statutesTitle?.[newLocale]}
                  text={`${vereinPage.statutesIntro?.[newLocale].substring(
                    0,
                    200
                  )}...`}
                  link={`/verein/statuten`}
                  source="/img/logoGreenBkgG.svg"
                />
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
