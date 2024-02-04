import Image from "next/legacy/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import homePage from "../public/multilanguage/homePage.json";
import emailjs from "@emailjs/browser";
import Header from "../components/Header.jsx";
import Intro from "../components/Intro.jsx";
import Card from "../components/Card.jsx";
import ListMedia from "../components/ListMedia.jsx";
import Footer from "../components/Footer";
import logoWhite from "../public/img/logoWhite.svg";
import client from "../components/sanityCli";
import transformDate from "../components/transformDate";
import Link from "next/link";
import Head from "next/head";
import headComponents from "../public/multilanguage/head.json";
import { TiNews } from "react-icons/ti";
import { BsMegaphoneFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useState, useRef } from "react";

const queryHomePage = `*[_type=='homePage']|order(_createdAt asc)
[0]
{sloganTitle, 
  sloganText, 
  sloganButton, 
  contactForm, 
  title, 
  ibanSlogan1,
  ibanSlogan2,
  iban,
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
  "de_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.de_CH.current)]| order(dateTime desc)[]{_type, title, abstract, dateTime, slug},
    "fr_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.fr_CH.current)]| order(dateTime desc)[]{_type, title, abstract, dateTime, slug},
    "it_CH": *[_type=='artikelMedia' && references(^._id) && defined(slug.it_CH.current)]| order(dateTime desc)[]{_type, title, abstract, dateTime, slug}}
`;
const queryPolitik = `{"de_CH": *[_type == 'politik' && defined(slug.de_CH.current)], "fr_CH": *[_type == 'politik' && defined(slug.fr_CH.current)], "it_CH": *[_type == 'politik' && defined(slug.it_CH.current)]}`;
const iconStyle = { color: "#000", height: "100%", marginRight: "2rem" };
export default function Home({ homeElements, medienMitt, politik }) {
  const { locale, locales, asPath } = useRouter();
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [openIban, setOpenIban] = useState(true);
  const [sent, setSent] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_webdev",
        "template_web_lr_grt",
        form.current,
        "wI1T6sSQk8GEygu_n"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setSent(true);
  };
  console.log("home elements", homeElements);
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
              text={`${
                homeElements?.[newLocale]?.[0]?.abstract?.[newLocale] !=
                undefined
                  ? homeElements?.[newLocale]?.[0]?.abstract?.[
                      newLocale
                    ].substring(0, 160)
                  : ""
              }...`}
              link={`/medien/${homeElements?.[newLocale]?.[0]?.slugCat?.slug.current}/${homeElements?.[newLocale]?.[0]?.slug?.[newLocale]?.current}`}
            />
            <Card
              alt="Placeholding picture"
              title={`${homeElements?.[newLocale]?.[1]?.title?.[newLocale]}`}
              text={`${
                homeElements?.[newLocale]?.[1]?.abstract?.[newLocale] !=
                undefined
                  ? homeElements?.[newLocale]?.[1]?.abstract?.[
                      newLocale
                    ].substring(0, 160)
                  : ""
              }...`}
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
              sortedMedien?.[newLocale]?.[0].dateTime.substring(0, 10)
            )}
            articleText={sortedMedien?.[newLocale]?.[0].abstract?.[
              newLocale
            ].substring(0, 250)}
            articleTitle={sortedMedien?.[newLocale]?.[0]?.title?.[newLocale]}
            href={
              sortedMedien?.[newLocale]?.[0]._type == "politik"
                ? `/${locale}/informationen/politik/${sortedMedien?.[newLocale]?.[0]?.slug?.[newLocale]?.current}`
                : `/${locale}/medien/medienmitteilungen/${sortedMedien?.[newLocale]?.[0]?.slug?.[newLocale]?.current}`
            }
          />
          <ListMedia
            articleData={transformDate(
              sortedMedien?.[newLocale]?.[1].dateTime.substring(0, 10)
            )}
            articleText={sortedMedien?.[newLocale]?.[1].abstract?.[
              newLocale
            ].substring(0, 250)}
            articleTitle={sortedMedien?.[newLocale]?.[1]?.title?.[newLocale]}
            href={
              sortedMedien?.[newLocale]?.[1]._type == "politik"
                ? `/${locale}/informationen/politik/${sortedMedien?.[newLocale]?.[1]?.slug?.[newLocale]?.current}`
                : `/${locale}/medien/medienmitteilungen/${sortedMedien?.[newLocale]?.[1]?.slug?.[newLocale]?.current}`
            }
          />
          <ListMedia
            articleData={transformDate(
              sortedMedien?.[newLocale]?.[2].dateTime.substring(0, 10)
            )}
            articleText={sortedMedien?.[newLocale]?.[2].abstract?.[
              newLocale
            ].substring(0, 250)}
            articleTitle={sortedMedien?.[newLocale]?.[2]?.title?.[newLocale]}
            href={
              sortedMedien?.[newLocale]?.[2]._type == "politik"
                ? `/${locale}/informationen/politik/${sortedMedien?.[newLocale]?.[2]?.slug?.[newLocale]?.current}`
                : `/${locale}/medien/medienmitteilungen/${sortedMedien?.[newLocale]?.[2]?.slug?.[newLocale]?.current}`
            }
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
                      <Link href="/verein/kantonale-sektionen">
                        {e.cantSections}
                      </Link>
                    </h2>
                  </div>
                  <div
                    className={`${styles.cardsTitTexBut} ${styles.Kontaktformular}`}
                  >
                    <h1>{e.contactForm}</h1>
                    {!sent && <p>{homeElements.contactForm?.[newLocale]}</p>}
                    {homePage.contact
                      .filter((e) => e.locale === locale)
                      .map((e, i) => {
                        return (
                          <div key={i} className={styles.contactForm}>
                            {!sent ? (
                              <form
                                onSubmit={handleSubmit}
                                ref={form}
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  className={`${styles.inputs} ${styles.inputName}`}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder={e.name}
                                  required
                                  id="name"
                                  name="name"
                                  value={name}
                                ></input>
                                <input
                                  className={`${styles.inputs} ${styles.inputEmail}`}
                                  placeholder="Email"
                                  required
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  id="email"
                                  name="email"
                                ></input>
                                <input
                                  required
                                  className={`${styles.inputs} ${styles.inputText}`}
                                  placeholder={e.text}
                                  onChange={(e) => setText(e.target.value)}
                                  style={{
                                    textAlign: "center",
                                    display: "flex",
                                    flexWrap: "wrap",
                                  }}
                                  value={text}
                                  id="text"
                                  name="text"
                                ></input>
                                <button
                                  className={`${styles.inputs} ${styles.buttonSubmit}`}
                                  type="submit"
                                >
                                  {e.button}
                                </button>
                              </form>
                            ) : (
                              <p style={{ width: "80%", textAlign: "center" }}>
                                {e.gesendet}
                              </p>
                            )}
                          </div>
                        );
                      })}
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
                    <Link href="/verein/leitbild">
                      {homeElements.sloganButton?.[newLocale]}
                    </Link>
                  </h2>
                </div>
              );
            })}
        </section>
        <section className={styles.sectionIban}>
          <Image src={logoWhite} alt="logo" />
          <h1 className={`${styles.titlesSections}`}>
            {homeElements.ibanSlogan1?.[newLocale]}
          </h1>
          {homeElements.ibanSlogan2?.[newLocale] && (
            <h1>{homeElements.ibanSlogan2?.[newLocale]}</h1>
          )}
          {homeElements.iban?.[newLocale] && (
            <h2>IBAN: {homeElements.iban?.[newLocale]}</h2>
          )}
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
      {openIban && (
        <div className={styles.slideIn}>
          <div
            className={styles.hoverPointer}
            onClick={() => setOpenIban(false)}
            style={{
              position: "absolute",
              top: 5,
              left: 5,
            }}
          >
            <MdClose style={{ width: "24px", height: "24px" }} />
          </div>
          <Image src={logoWhite} alt="logo" />
          {homeElements.ibanSlogan1?.[newLocale] && (
            <h2>{homeElements.ibanSlogan1?.[newLocale]}</h2>
          )}
          {homeElements.ibanSlogan2?.[newLocale] && (
            <h2>{homeElements.ibanSlogan2?.[newLocale]}</h2>
          )}
          {homeElements.iban?.[newLocale] && (
            <p>IBAN: {homeElements.iban?.[newLocale]}</p>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const homeElements = await client.fetch(queryHomePage);
  const medienMitt = await client.fetch(queryMedienMitteilungen);
  const politik = await client.fetch(queryPolitik);
  return {
    props: {
      homeElements,
      medienMitt,
      politik,
    },
  };
}
