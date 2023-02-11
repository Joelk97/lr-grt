import Image from "next/legacy/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import homePage from "../public/multilanguage/homePage.json";
import MyHead from "../components/MyHead.jsx";
import Header from "../components/Header.jsx";
import Intro from "../components/Intro.jsx";
import Card from "../components/Card.jsx";
import ListMedia from "../components/ListMedia.jsx";
import Footer from "../components/Footer";
import client from "../components/sanityCli";
import transformDate from "../components/transformDate";
import Link from "next/link";
import Head from "next/head";
import headComponents from "../public/multilanguage/head.json";
import { TiNews } from "react-icons/ti";
import { BsMegaphoneFill } from "react-icons/bs";

const queryHomePage = `*[_type=='homePage']|order(_createdAt asc)
[0]
{sloganTitle, 
  sloganText, 
  sloganButton, 
  contactForm, 
  title, 
  slogan1, 
  slogan2, 
  button, 
  'imageBkg': bkgImageIntro.asset -> url,
  becomeAsso,
  becomeAssoTit,
  "de_CH":acutalityDe[]->{"slugCat":category -> {title, slug}, _type, title, abstract, slug},
  "fr_CH":acutalityFr[]->{"slugCat":category -> {title, slug}, _type,title, abstract, slug},
  "it_CH":acutalityIt[]->{"slugCat":category -> {title, slug}, _type,title, abstract, slug},
  "de":infoDe[]->{_type, title, abstract, slug},
  "fr":infoFr[]->{_type,title, abstract, slug},
  "it":infoIt[]->{_type,title, abstract, slug},
}



`;
const queryMedienMitteilungen = `*[_type=="katMedia" && slug.current == 'medienmitteilungen'][0]{
  "de_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.de_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "fr_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.fr_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug},
    "it_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.it_CH.current)]| order(dateTime desc)[]{title, abstract, dateTime, slug}}
`;
const iconStyle = { color: "#000", height: "100%", marginRight: "2rem" };
export default function Home({ homeElements, medienMitt }) {
  const { locale, locales, asPath } = useRouter();
  const newLocale = locale.substring(0, 2) + "_CH";
  const giveLink = (type) => {
    if (type == "news" || type == "medienMitteilungen") {
      return `/medien/${type?.toLowerCase()}/`;
    } else if (type == "situationWolf") {
      return `/informationen/situation-wolf/`;
    } else {
      return `/informationen/${type?.toLowerCase()}/`;
    }
  };
  const getShorter = (phrase) => {
    let newPhrase = [];
    phrase = phrase.split(" ");
    for (let i = 0; i < 5; i++) {
      newPhrase.push(phrase[i]);
    }
    return newPhrase.join(" ");
  };
  return (
    <>
      {headComponents.head
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{`Home - ${element.title}`}</title>
              <meta name="description" content={element.description} />
            </Head>
          );
        })}
      <Header />
      <main className={styles.main}>
        <div className={styles.backGroundImgIntro}>
          <Image
            alt="Background Image"
            src={homeElements.imageBkg}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />
        </div>

        <Intro
          titolo={homeElements.title?.[newLocale]}
          slogan1={homeElements.slogan1?.[newLocale]}
          slogan2={homeElements.slogan2?.[newLocale]}
          button={homeElements.button?.[newLocale]}
        />

        <section className={styles.sectionActuality}>
          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <h1
                  className={`${styles.titleAcutality} ${styles.titlesSections}`}
                  key={i}
                >
                  <TiNews style={iconStyle} />
                  {e.actuality}
                </h1>
              );
            })}

          <div className={styles.cards}>
            <Card
              alt="Placeholding picture"
              title={`${homeElements?.[newLocale]?.[0]?.title?.[newLocale]}`}
              text={`${homeElements?.[newLocale]?.[0]?.abstract?.[
                newLocale
              ].substring(0, 160)}...`}
              link={`/medien/${homeElements?.[newLocale]?.[0]?.slugCat?.slug.current}/${homeElements?.[newLocale]?.[0]?.slug?.[newLocale]?.current}`}
            />
            <Card
              alt="Placeholding picture"
              title={`${homeElements?.[newLocale]?.[1]?.title?.[newLocale]}`}
              text={`${homeElements?.[newLocale]?.[1]?.abstract?.[
                newLocale
              ].substring(0, 160)}...`}
              link={`/medien/${homeElements?.[newLocale]?.[1]?.slugCat?.slug.current}/${homeElements?.[newLocale]?.[1]?.slug?.[newLocale]?.current}`}
            />
          </div>
        </section>
        <section className={styles.sectionMedienMitteilungen}>
          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <Link key={i} href="/medien/medienmitteilungen">
                  <h1
                    className={`${styles.titleMedia} ${styles.titlesSections}`}
                  >
                    <BsMegaphoneFill style={iconStyle} />
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
                    className={`${styles.greenButton} ${styles.buttonMoreMedia}`}
                  >
                    {e.moreMedia}
                  </h2>
                </Link>
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
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />

          {homePage.titles
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <div key={i} className={`${styles.takePartContent}`}>
                  <div
                    className={`${styles.cardsTitTexBut} ${styles.mitgliedWerden}`}
                  >
                    <h1>{homeElements?.becomeAssoTit?.[newLocale]}</h1>
                    <p>{homeElements?.becomeAsso?.[newLocale]}</p>
                    <h2
                      className={`${styles.greenButton} ${styles.cantSectButton}`}
                    >
                      {e.cantSections}
                    </h2>
                  </div>
                  <div
                    className={`${styles.cardsTitTexBut} ${styles.Kontaktformular}`}
                  >
                    <h1>{e.contactForm}</h1>
                    <p>{homeElements.contactForm?.[newLocale]}</p>
                    <div className={styles.contactForm}>
                      <input
                        className={`${styles.inputs} ${styles.inputName}`}
                        placeholder="Name"
                      ></input>
                      <input
                        className={`${styles.inputs} ${styles.inputEmail}`}
                        placeholder="Email"
                      ></input>
                      <input
                        className={`${styles.inputs} ${styles.inputText}`}
                        placeholder="Text"
                      ></input>
                      <button
                        className={`${styles.inputs} ${styles.buttonSubmit}`}
                        type="submit"
                      >
                        Senden
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </section>
        <section className={styles.sectionSlogan}>
          <Image
            layout="fill"
            objectFit="contain"
            alt="Logo"
            src="/img/logoGreenBkgW.svg"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />
          {homePage.whatWeWant
            .filter((l) => l.locale === locale)
            .map((e, i) => {
              return (
                <div key={i} className={styles.contentSlogan}>
                  <h1 className={`${styles.titlesSections}`}>
                    {homeElements.sloganTitle?.[newLocale]}
                  </h1>
                  <p>{homeElements.sloganText?.[newLocale]}</p>
                  <h2 className={styles.greenButton}>
                    {homeElements.sloganButton?.[newLocale]}
                  </h2>
                </div>
              );
            })}
        </section>
        <section className={styles.sectionInfo}>
          <Image
            alt="Cows"
            src="/img/marlene.jpg"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />

          <div className={`${styles.contentInfo}`}>
            <div className={`${styles.cardInfo} ${styles.cardsTitTexBut}`}>
              <h1>
                {`${getShorter(
                  homeElements?.[locale.substring(0, 2)]?.[0]?.title?.[
                    newLocale
                  ]
                )}...`}
              </h1>
              <p>
                {`${homeElements?.[locale.substring(0, 2)]?.[0]?.abstract?.[
                  newLocale
                ].substring(0, 200)}...`}
              </p>
              {homePage.whatWeWant
                .filter((l) => l.locale === locale)
                .map((e, i) => {
                  return (
                    <h2 key={i} className={styles.greenButton}>
                      <Link
                        href={`${giveLink(
                          homeElements?.[locale.substring(0, 2)]?.[0]?._type
                        )}${
                          homeElements?.[locale.substring(0, 2)]?.[0]?.slug?.[
                            newLocale
                          ]?.current
                        }`}
                      >
                        {e.button}
                      </Link>
                    </h2>
                  );
                })}
            </div>
            <div className={`${styles.cardInfo} ${styles.cardsTitTexBut}`}>
              <h1>
                {`${getShorter(
                  homeElements?.[locale.substring(0, 2)]?.[1]?.title?.[
                    newLocale
                  ]
                )}...`}
              </h1>
              <p>
                {`${homeElements?.[locale.substring(0, 2)]?.[1]?.abstract?.[
                  newLocale
                ].substring(0, 200)}...`}
              </p>
              {homePage.whatWeWant
                .filter((l) => l.locale === locale)
                .map((e, i) => {
                  return (
                    <h2 key={i} className={styles.greenButton}>
                      <Link
                        href={`${giveLink(
                          homeElements?.[locale.substring(0, 2)]?.[1]?._type
                        )}${
                          homeElements?.[locale.substring(0, 2)]?.[1]?.slug?.[
                            newLocale
                          ]?.current
                        }`}
                      >
                        {e.button}
                      </Link>
                    </h2>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const homeElements = await client.fetch(queryHomePage);
  const medienMitt = await client.fetch(queryMedienMitteilungen);
  return {
    props: {
      homeElements,
      medienMitt,
    },
  };
}
