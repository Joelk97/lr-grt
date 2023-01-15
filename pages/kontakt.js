import { useRouter } from "next/router";
import MyHead from "../components/MyHead.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styleHome from "../styles/Home.module.css";
import Image from "next/legacy/image";
import Intro from "../components/Intro.jsx";
import mountain1 from "../public/img/mountain1.jpg";
import kontaktelements from "../public/multilanguage/kontakt.json";

export default function Kontakt() {
  const { locale, locales, asPath } = useRouter();
  return (
    <>
      <MyHead />
      <Header kontakt="true" />
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image Mountains"
            src={mountain1}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {kontaktelements.kontaktIntro
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return <Intro key={i} titolo={e.title} slogan1={e.text} />;
          })}
      </main>
      <Footer />
    </>
  );
}
