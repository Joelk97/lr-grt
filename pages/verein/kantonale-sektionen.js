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
import Card from "../../components/CardSekt.jsx";
import client from "../../components/sanityCli.js";
import NavigatorPages from "../../components/navigatorPages.jsx";
import headComponents from "../../public/multilanguage/head.json";
import Head from "next/head";

const queryKantSekt = `*[_type=='cantonalSections'][]|order(title, asc){email,
    "imageC": image.asset -> url,
    "mitgliederA": mitglieder[]-> {name},
      title,
      website,
      zone
  }
  `;
const queryCantSect = `*[_type == 'introCantSect'][0]`;
function Mailto({ email, subject, body, ...props }) {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}$body=${body || ""}`}>
      {props.children}
    </a>
  );
}
export default function KantonaleSektionen({ kantSektionen, intro }) {
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
        <NavigatorPages />
        <div className={styles.intro2}>
          <h1 className={styleHome.titlesSections}>
            {intro?.title?.[newLocale]}
          </h1>
          <p className={styles.introText2}>{intro?.abstract?.[newLocale]}</p>
        </div>

        <section className={styles.containerCards}>
          {kantSektionen.map((sekt, i) => {
            return (
              <Card
                key={i}
                title={sekt.title}
                source={sekt.imageC ? sekt.imageC : ""}
                objectFit="contain"
                zone={sekt.zone}
                person={sekt?.mitgliederA?.[0]?.name}
                email={sekt.email && sekt.email.substring(7)}
                website={sekt.website && sekt.website}
              />
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const kantSektionen = await client.fetch(queryKantSekt);
  const intro = await client.fetch(queryCantSect);
  return {
    props: {
      kantSektionen,
      intro,
    },
  };
}
