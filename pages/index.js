import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import headComponents from "../public/multilanguage/head.json";
import MyHead from "../components/myHead";
import Header from "../components/Header";
import Intro from "../components/Intro";
import nolanImg from "../public/img/nolan.jpg";
import intros from "../public/multilanguage/intros.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { locale, locales, asPath } = useRouter();
  return (
    <>
      <MyHead />
      <main className={styles.main}>
        <Header />
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
        <section></section>
      </main>
    </>
  );
}
