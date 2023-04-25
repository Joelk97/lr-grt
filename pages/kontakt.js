import { useRouter } from "next/router";
import MyHead from "../components/MyHead.jsx";
import styles from "../styles/Home.module.css";
import Header from "../components/Header.jsx";
import homePage from "../public/multilanguage/homePage.json";
import Footer from "../components/Footer.jsx";
import styleHome from "../styles/Home.module.css";
import Image from "next/legacy/image";
import Intro from "../components/Intro.jsx";
import mountain1 from "../public/img/mountain1.jpg";
import kontaktelements from "../public/multilanguage/kontakt.json";
import headComponents from "../public/multilanguage/head.json";
import Head from "next/head";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";

export default function Kontakt() {
  const { locale, locales, asPath } = useRouter();
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
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
  return (
    <>
      {headComponents.kontakt
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{`${element.title}`}</title>
              <meta name="description" content={element.description} />
            </Head>
          );
        })}
      <Header kontakt="true" />
      <main className={styleHome.main}>
        <div className={styleHome.backGroundImgIntro}>
          <Image
            alt="Background Image Mountains"
            src={mountain1}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/img/logoGreenBkgG.svg"
          />
        </div>
        {kontaktelements.kontaktIntro
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return <Intro key={i} titolo={e.title} slogan1={e.text} />;
          })}
        {homePage.titles
          .filter((l) => l.locale === locale)
          .map((e, i) => {
            return (
              <div
                style={{ width: "100%" }}
                className={`${styles.cardsTitTexBut} ${styles.Kontaktformular}`}
                key={i}
              >
                <h1>{e.contactForm}</h1>

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
            );
          })}
      </main>
      <Footer />
    </>
  );
}
