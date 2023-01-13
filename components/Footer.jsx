import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css"
import Image from "next/legacy/image";




const Footer = (props) => {
   const date = new Date();
   const year = date.getFullYear();
    return (
        <footer className={styles.container}>
            <div className={styles.copyright}><Image src="/img/logoWhite.svg" width={180} height={70}/><p>{`© Copyright - ${year} VSLvGRT`}</p></div>
            <div></div>
        </footer>
    )
}

export default Footer;