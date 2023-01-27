import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MyHead from "../../../components/MyHead";
import NavigatorPages from "../../../components/navigatorPages";
import headComponents from "../../../public/multilanguage/head.json";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Studien() {
  const { locale, locales, asPath } = useRouter();
  return (
    <>
      {headComponents.studien
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{`${element.title}`}</title>
              <meta name="description" content={element.description} />
            </Head>
          );
        })}
      <Header media="true" />
      <NavigatorPages />
      <Footer />
    </>
  );
}
