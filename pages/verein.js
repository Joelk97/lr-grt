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

export default function UeberUns() {
  const { locale, loales, asPath } = useRouter();

  return (
    <>
      <MyHead />
      <Header verein="true" />
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={sheeps1}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {vereinElements.vereinIntro
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return <Intro key={i} titolo={e.title} slogan1={e.text} />;
          })}
        <div className={styles.intro2}>
          <h1 className={styleHome.titlesSections}>Wer wir sind</h1>
          <p className={styles.introText2}>
            Hier steht ein weiterer Einführungstext über den Verein. Hier steht
            ein weiterer Einführungstext über den Verein. Hier steht ein
            weiterer Einführungstext über den Verein. Hier steht ein weiterer
            Einführungstext über den Verein.
          </p>
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
