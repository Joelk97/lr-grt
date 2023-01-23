import MyHead from "../components/MyHead";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styleHome from "../styles/Home.module.css";
import styles from "../styles/Medien.module.css";
import cow1 from "../public/img/cow1.jpg";
import Image from "next/legacy/image";
import Intro from "../components/Intro";
import medien from "../public/multilanguage/medien.json";
import { useRouter } from "next/router";
import homePage from "../public/multilanguage/homePage.json";
import ListMedia from "../components/ListMedia";
import Card from "../components/Card";
import client from "../components/sanityCli";
import transformDate from "../components/transformDate";
import NavigatorPages from "../components/navigatorPages";
import Link from "next/link";

const queryMediaPage =
  "*[_type=='mediaPage']|order(_createdAt asc)[0]{slug,title, intro, 'imageBkg': bkgImageIntro.asset -> url}";
const queryMedienMitteilungen =
  "{'de_CH':*[_type=='medienMitteilungen'&&defined(slug.de_CH.current)] | order(dateTime desc)[]{title, abstract, dateTime, slug},'fr_CH':*[_type=='medienMitteilungen'&&defined(slug.fr_CH.current)] | order(dateTime desc)[]{title, abstract, dateTime, slug}, 'it_CH':*[_type=='medienMitteilungen'&&defined(slug.it_CH.current)] | order(dateTime desc)[]{title, abstract, dateTime, slug}}";

export default function Medien({ mediaPage, medienMitt }) {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";

  return (
    <>
      <MyHead />
      <Header media="true" />
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={mediaPage.imageBkg}
            layout="fill"
            objectFit="cover"
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
                    {e.media}
                  </h1>
                </Link>
              );
            })}
          <ListMedia
            articleData={transformDate(
              medienMitt?.[newLocale]?.[0]?.dateTime.substring(0, 10)
            )}
            articleText={medienMitt?.[newLocale]?.[0]?.abstract?.[
              newLocale
            ].substring(0, 250)}
            articleTitle={medienMitt?.[newLocale]?.[0]?.title?.[newLocale]}
            href={`/${locale}/medien/medienmitteilungen/${medienMitt?.[newLocale]?.[0]?.slug?.[newLocale]?.current}`}
          />
          <ListMedia
            articleData={transformDate(
              medienMitt?.[newLocale]?.[1]?.dateTime.substring(0, 10)
            )}
            articleText={medienMitt?.[newLocale]?.[1]?.abstract?.[
              newLocale
            ].substring(0, 250)}
            articleTitle={medienMitt?.[newLocale]?.[1]?.title?.[newLocale]}
            href={`/${locale}/medien/medienmitteilungen/${medienMitt?.[newLocale]?.[1]?.slug?.[newLocale]?.current}`}
          />
          <ListMedia
            articleData={transformDate(
              medienMitt?.[newLocale]?.[2]?.dateTime.substring(0, 10)
            )}
            articleText={medienMitt?.[newLocale]?.[2]?.abstract?.[
              newLocale
            ].substring(0, 250)}
            articleTitle={medienMitt?.[newLocale]?.[2]?.title?.[newLocale]}
            href={`/${locale}/medien/medienmitteilungen/${medienMitt?.[newLocale]?.[2]?.slug?.[newLocale]?.current}`}
          />
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
        <section className={styles.otherMedia}>
          {medien.medienCards
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <div key={i} className={styleHome.cards}>
                  <Card
                    source="https://picsum.photos/300/200"
                    alt="Placeholding picture"
                    title={e.newsTitle}
                    text={e.newsText}
                    link="/medien/news"
                  />

                  <Card
                    source="/img/nolan.jpg"
                    alt="Placeholding picture"
                    title={e.studiesTitle}
                    text={e.studiesText}
                    link="/medien/studien"
                  />
                </div>
              );
            })}
        </section>
        <section className={styleHome.sectionSlogan}>
          <Image
            layout="fill"
            objectFit="contain"
            alt="Logo"
            src="/img/logoGreenBkgW.svg"
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
                  />
                  <br />
                </div>
              );
            })}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const mediaPage = await client.fetch(queryMediaPage);
  const medienMitt = await client.fetch(queryMedienMitteilungen);
  return {
    props: {
      mediaPage,
      medienMitt,
    },
  };
}
