import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/ErrorPage.module.css'

export default function errorPage() {
    return <div className={styles.errorContainer}>
        <Head>
            <title>404</title>
        </Head>
        <div className={styles.upperHalf}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png" alt="pokeball"/>
            <span className={styles.title}>404 page</span>
        </div>
        <Link href={"/"}>
            <a className={styles.link}>Go Back Home</a>
        </Link>
    </div>
}