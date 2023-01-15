import Head from "next/head";
import { useRouter } from "next/router";
import headComponents from "../public/multilanguage/head.json";

const MyHead = () => {
  const { locale, locales, asPath } = useRouter();
  return (
    <>
      {headComponents.head
        .filter((l) => l.locale === locale)
        .map((element, i) => {
          return (
            <Head key={i}>
              <title>{element.title}</title>
              <meta name="description" content={element.description} />
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
