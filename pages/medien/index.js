import MyHead from "../../components/MyHead";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styleHome from "../../styles/Home.module.css";
import styles from "../../styles/Medien.module.css";
import Image from "next/legacy/image";
import Intro from "../../components/Intro";
import medien from "../../public/multilanguage/medien.json";
import { useRouter } from "next/router";
import homePage from "../../public/multilanguage/homePage.json";
import ListMedia from "../../components/ListMedia";
import Card from "../../components/Card";
import client from "../../components/sanityCli";
import transformDate from "../../components/transformDate";
import NavigatorPages from "../../components/navigatorPages";
import Link from "next/link";
import headComponents from "../../public/multilanguage/head.json";
import Head from "next/head";
import { BsMegaphone, BsMegaphoneFill } from "react-icons/bs";
import { TiNews } from "react-icons/ti";

const queryMediaPage =
  "*[_type=='mediaPage']|order(_createdAt asc)[0]{slug,title, intro, 'imageBkg': bkgImageIntro.asset -> url}";
const queryMedienMitteilungen = `*[_type=="katMedia" && slug.current == 'medienmitteilungen'][0]{
  "de_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.de_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "fr_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.fr_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "it_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.it_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug}}
`;
const queryPolitik = `{"de_CH": *[_type == 'politik' && defined(slug.de_CH.current)], "fr_CH": *[_type == 'politik' && defined(slug.fr_CH.current)], "it_CH": *[_type == 'politik' && defined(slug.it_CH.current)]}`;
const queryNews = `*[_type=="katMedia" && slug.current == 'news'][0]{
  "de_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.de_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "fr_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.fr_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "it_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.it_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug}}
`;
const iconStyle = { color: "#000", height: "100%", marginRight: "2rem" };
export default function Medien({ mediaPage, medienMitt, news, politik }) {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  const alleMedien = {
    de_CH: [...medienMitt.de_CH, ...politik.de_CH],
    fr_CH: [...medienMitt.fr_CH, ...politik.fr_CH],
    it_CH: [...medienMitt.it_CH, ...politik.it_CH],
  };
  let sortedMedien = {
    de_CH: alleMedien.de_CH.sort((m1, m2) =>
      m1.dateTime < m2.dateTime ? 1 : m1.dateTime > m2.dateTime ? -1 : 0
    ),
    fr_CH: alleMedien.fr_CH.sort((m1, m2) =>
      m1.dateTime < m2.dateTime ? 1 : m1.dateTime > m2.dateTime ? -1 : 0
    ),
    it_CH: alleMedien.it_CH.sort((m1, m2) =>
      m1.dateTime < m2.dateTime ? 1 : m1.dateTime > m2.dateTime ? -1 : 0
    ),
  };
  return (
    <>
      {headComponents.media
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
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={mediaPage.imageBkg}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />
        </div>

        <Intro
          titolo={mediaPage.title?.[newLocale]}
          slogan1={mediaPage.intro?.[newLocale]}
        />
        <NavigatorPages />
        <section
          className={`${styleHome.sectionMedienMitteilungen} ${styles.sectionMedienMitteilungen}`}
        >
          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <Link key={i} href="/medien/medienmitteilungen">
                  <h1
                    className={`${styleHome.titleMedia} ${styleHome.titlesSections}`}
                  >
                    <BsMegaphoneFill style={iconStyle} />
                    {e.media}
                  </h1>
                </Link>
              );
            })}
          {medienMitt?.[newLocale]?.slice(0, 3).map((article, i) => {
            return (
              <ListMedia
                key={i}
                articleData={transformDate(article.dateTime)}
                articleText={article?.abstract?.[newLocale].substring(0, 250)}
                articleTitle={article?.title?.[newLocale]}
                href={
                  article._type == "politik"
                    ? `/${locale}/informationen/politik/${article?.slug?.[newLocale]?.current}`
                    : `/${locale}/medien/medienmitteilungen/${article.slug?.[newLocale]?.current}`
                }
              />
            );
          })}
          {homePage.buttons
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <Link key={i} href="/medien/medienmitteilungen">
                  <h2
                    className={`${styleHome.greenButton} ${styleHome.buttonMoreMedia}`}
                  >
                    {e.moreMedia}
                  </h2>
                </Link>
              );
            })}
        </section>
        <section
          className={`${styleHome.sectionMedienMitteilungen} ${styles.sectionMedienMitteilungen}`}
        >
          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <Link key={i} href="/medien/news">
                  <h1
                    className={`${styleHome.titleMedia} ${styleHome.titlesSections}`}
                  >
                    <TiNews style={iconStyle} />
                    News
                  </h1>
                </Link>
              );
            })}

          {news?.[newLocale]?.slice(0, 3).map((article, i) => {
            return (
              <ListMedia
                key={i}
                articleData={transformDate(article.dateTime.substring(0, 10))}
                articleText={article?.abstract?.[newLocale].substring(0, 250)}
                articleTitle={article?.title?.[newLocale]}
                href={`/${locale}/medien/news/${article.slug?.[newLocale]?.current}`}
              />
            );
          })}

          {homePage.buttons
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <Link key={i} href="/medien/news">
                  <h2
                    className={`${styleHome.greenButton} ${styleHome.buttonMoreMedia}`}
                  >
                    {e.moreNews}
                  </h2>
                </Link>
              );
            })}
        </section>
        {/* <section className={styleHome.sectionSlogan}>
          <Image
            layout="fill"
            objectFit="contain"
            alt="Logo"
            src="/img/logoGreenBkgW.svg"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />
          {medien.medienFollow
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <div key={i} className={styleHome.contentSlogan}>
                  <h1
                    className={`${styleHome.titlesSections} ${styles.titleSlogan}`}
                  >
                    {e.title}
                  </h1>
                  <Image
                    width={300}
                    height={200}
                    alt="FB Post"
                    src="/img/exampleFB.jpg"
                    placeholder="blur"
                    blurDataURL="/img/logoGreenBkgG.svg"
                  />
                  <br />
                </div>
              );
            })}
        </section> */}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const mediaPage = await client.fetch(queryMediaPage);
  const medienMitt = await client.fetch(queryMedienMitteilungen);
  const news = await client.fetch(queryNews);
  const politik = await client.fetch(queryPolitik);
  return {
    props: {
      mediaPage,
      medienMitt,
      news,
      politik,
    },
  };
}
