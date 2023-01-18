import styles from "../styles/NavigatorPages.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import navigatorPagesElements from "../public/multilanguage/navigatorPages.json"
import slugToTitle from "./slugToTitle"
import { getStaticProps } from "../pages"

const NavigatorPages = (props) => {
   const {locale, locales, asPath} = useRouter();
   const pages = asPath.split("/").slice(1);
   const langPages = navigatorPagesElements.pages.filter((l) => l.locale === locale)
   const links = navigatorPagesElements.links.filter((l) => l.locale === locale)
   return (
        <div className={styles.container}>
            <div className={styles.list}>
            <h3><Link className={styles.links} href="/">{`Home `}</Link></h3>

            {pages.map((e, i) => {
                return (<Link key={i} className={styles.links} href={`${links[0][e] != undefined ? links[0][e] : "/"}`}>{`>`}<h3>{`${langPages[0][e] != undefined ? langPages[0][e] : props.slug != undefined ? props.slug.substring(0,30)+'...': ""}`}</h3></Link>
                    
                )
            })}
            </div>
        </div>
    )
}

export default NavigatorPages