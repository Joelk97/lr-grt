import Head from "next/head";
import { useRouter } from "next/router";
import headComponents from "../public/multilanguage/head.json";

const MyHead = ({ props }) => {
  const { locale, locales, asPath } = useRouter();
  const pages = asPath.split("/").slice(1);
  return (
    <>
      {headComponents.head
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{`${pages[0]} - ${element.title}`}</title>
              <meta name="theme-color" content="#87bb3f" />
              <meta name="description" content={element.description} />
              <meta
                httpEquiv="Content-type"
                content="text/html; charset=utf-8"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
          );
        })}
    </>
  );
};

export default MyHead;
