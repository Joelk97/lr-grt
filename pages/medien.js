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

const queryMediaPage =
  "*[_type=='mediaPage']|order(_createdAt asc)[0]{title, intro, 'imageBkg': bkgImageIntro.asset -> url}";

export default function Medien({ mediaPage }) {
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

        <section className={styleHome.sectionMedienMitteilungen}>
          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <h1
                  className={`${styleHome.titleMedia} ${styleHome.titlesSections}`}
                  key={i}
                >
                  {e.media}
                </h1>
              );
            })}
          <ListMedia
            articleData="24.10.2022"
            articleText="Aliquip ea ipsum ex veniam laborum cupidatat ad ut sint laborum voluptate ea aliquip. Reprehenderit dolore sint id elit minim non consectetur. Labore esse sit labore in tempor duis voluptate. Consectetur pariatur mollit mollit est laborum irure. Excepteur anim reprehenderit esse magna ullamco adipisicing velit voluptate."
            articleTitle="Deserunt culpa qui qui nulla in laboris id ex."
          />
          <ListMedia
            articleData="20.10.2022"
            articleText="Aliquip ea ipsum ex veniam laborum cupidatat ad ut sint laborum voluptate ea aliquip. Reprehenderit dolore sint id elit minim non consectetur. Labore esse sit labore in tempor duis voluptate. Consectetur pariatur mollit mollit est laborum irure. Excepteur anim reprehenderit esse magna ullamco adipisicing velit voluptate."
            articleTitle="Deserunt culpa qui qui nulla in laboris id ex."
          />
          <ListMedia
            articleData="12.01.2023"
            articleText="Aliquip ea ipsum ex veniam laborum cupidatat ad ut sint laborum voluptate ea aliquip. Reprehenderit dolore sint id elit minim non consectetur. Labore esse sit labore in tempor duis voluptate. Consectetur pariatur mollit mollit est laborum irure. Excepteur anim reprehenderit esse magna ullamco adipisicing velit voluptate."
            articleTitle="Deserunt culpa qui qui nulla in laboris id ex."
          />
          {homePage.buttons
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <h2
                  key={i}
                  className={`${styleHome.greenButton} ${styleHome.buttonMoreMedia}`}
                >
                  {e.moreMedia}
                </h2>
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
                  />
                  <Card
                    source="/img/nolan.jpg"
                    alt="Placeholding picture"
                    title={e.studiesTitle}
                    text={e.studiesText}
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
                  <h1 className={`${styleHome.titlesSections}`}>{e.title}</h1>
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
  return {
    props: {
      mediaPage,
    },
  };
}
