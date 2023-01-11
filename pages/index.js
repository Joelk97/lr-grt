import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import headComponents from "../public/multilanguage/head.json";
import MyHead from "../components/myHead";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { locale, locales, asPath } = useRouter();
  return (
    <>
      <MyHead />
      <main className={styles.main}>
        <Header />
      </main>
    </>
  );
}
