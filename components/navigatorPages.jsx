import styles from "../styles/NavigatorPages.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import navigatorPagesElements from "../public/multilanguage/navigatorPages.json"
import slugToTitle from "./slugToTitle"

const NavigatorPages = () => {
   const {locale, locales, asPath} = useRouter();
   const pages = asPath.split("/").slice(1);
   const langPages = navigatorPagesElements.pages.filter((l) => l.locale === locale)
    return (
        <div className={styles.container}>
            <div className={styles.list}>
            <h3><Link className={styles.links} href="/">{`Home `}</Link></h3>

            {pages.map((e, i) => {
                return (<Link key={i} className={styles.links} href={`/${e}`}>{`>`}<h3>{`${langPages[0][e] != undefined ? langPages[0][e] : slugToTitle(e)}`}</h3></Link>
                    
                )
            })}
            </div>
        </div>
    )
}

export default NavigatorPages