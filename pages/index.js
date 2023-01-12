import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import headComponents from "../public/multilanguage/head.json";
import homePage from "../public/multilanguage/homePage.json";
import MyHead from "../components/MyHead";
import Header from "../components/Header";
import Intro from "../components/Intro";
import nolanImg from "../public/img/nolan.jpg";
import intros from "../public/multilanguage/intros.json";
import Card from "../components/Card";
import ListMedia from "../components/listMedia";
import xavier from "../public/img/xavier.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { locale, locales, asPath } = useRouter();
  return (
    <>
      <MyHead />
      <Header />
      <main className={styles.main}>
        <div className={styles.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={nolanImg}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {intros.introHome
          .filter((l) => l.locale === locale)
          .map((element, i) => {
            return (
              <Intro
                key={i}
                titolo={element.title}
                slogan1={element.slogan1}
                slogan2={element.slogan2}
                button={element.button}
              />
            );
          })}
        <section className={styles.sectionActuality}>
          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <h1
                  className={`${styles.titleAcutality} ${styles.titlesSections}`}
                  key={i}
                >
                  {e.actuality}
                </h1>
              );
            })}

          <div className={styles.cards}>
            <Card
              source="/img/nolan.jpg"
              alt="Placeholding picture"
              title="Titel"
              text="Hier steht ein text der in etwa so lang ist, wie dieser hier. Vielleicht auch ein bisschen länger."
            />
            <Card
              source="https://picsum.photos/300/200"
              alt="Placeholding picture"
              title="Titel"
              text="Hier steht ein text der in etwa so lang ist, wie dieser hier. Vielleicht auch ein bisschen länger."
            />
          </div>
        </section>
        <section className={styles.sectionMedienMitteilungen}>
          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <h1
                  className={`${styles.titleMedia} ${styles.titlesSections}`}
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
                  className={`${styles.greenButton} ${styles.buttonMoreMedia}`}
                >
                  {e.moreMedia}
                </h2>
              );
            })}
        </section>
        <section className={styles.sectionTakePart}>
          <Image
            className={`${styles.takePartBkgImg}`}
            src="/img/xavier.jpg"
            alt="Cows"
            layout="fill"
            objectFit="cover"
          />
          <div className={`${styles.takePartContent}`}>Ciao</div>
        </section>
      </main>
    </>
  );
}
