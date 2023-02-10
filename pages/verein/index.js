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

const queryVereinPage = `*[_type=='vereinPage']|order(_createdAt asc)[0]{title, intro,
    'imageBkg': bkgImageIntro.asset -> url,
     underKatVer[] -> {title, slug, abstract, "image": bkgImage.asset -> url},
    unterEinf
    }
`;
const queryCantSect = `*[_type == 'introCantSect'][0]`;
export default function UeberUns({ vereinPage, cantSect }) {
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
        {vereinPage.unterEinf.map((einf, i) => {
          return (
            <div key={i} className={styles.intro2}>
              <h1 className={styles.titlesSections}>
                {einf.title?.[newLocale]}
              </h1>
              <p className={styles.introText2}>{einf.text?.[newLocale]}</p>
            </div>
          );
        })}
        {vereinElements.assoCat
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return (
              <section key={i} className={styles.containerCards}>
                <Card
                  title={cantSect.title?.[newLocale]}
                  text={cantSect?.abstract?.[newLocale]}
                  link={`/verein/kantonale-sektionen`}
                />
                {vereinPage.underKatVer.map((card, i) => {
                  return (
                    <Card
                      key={i}
                      title={card?.title?.[newLocale]}
                      text={card?.abstract?.[newLocale]}
                      link={`/verein/${card?.slug?.de_CH.current}`}
                      source={card?.image ? card.image : ""}
                    />
                  );
                })}
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
  const cantSect = await client.fetch(queryCantSect);
  return {
    props: {
      vereinPage,
      cantSect,
    },
  };
}
