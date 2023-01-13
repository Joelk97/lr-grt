import { useRouter } from "next/router";
import MyHead from "../components/MyHead.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styleHome from "../styles/Home.module.css";
import styles from "../styles/Informationen.module.css";
import sheeps1 from "../public/img/sheeps1.jpg";
import Image from "next/image.js";
import infromationenElements from "../public/multilanguage/informationen.json";
import Intro from "../components/Intro.jsx";
import Card from "../components/Card.jsx";

export default function UeberUns() {
  const { locale, loales, asPath } = useRouter();
  return (
    <>
      <MyHead />
      <Header informationen="true" />
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={sheeps1}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {infromationenElements.INFOSIntro.filter(
          (l) => l.locale === locale
        ).map((e, i) => {
          return <Intro key={i} titolo={e.title} slogan1={e.text} />;
        })}
      </main>
      <Footer />
    </>
  );
}
