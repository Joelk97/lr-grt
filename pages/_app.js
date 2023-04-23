import Head from "next/head";
import "../styles/globals.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-5TNYP0CH3V");

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
