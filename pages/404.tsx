import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/ErrorPage.module.css'
import pokeball from "../assets/pokeball.png"

export default function errorPage() {
    return <div className={styles.errorContainer}>
        <Head>
            <title>404</title>
        </Head>
        <div className={styles.upperHalf}>
            <div className={styles.pokeImg}>
                <Image src={pokeball} alt="pokeball" />
            </div>
            <span className={styles.title}>404 page</span>
        </div>
        <Link href={"/"}>
            <a className={styles.link}>Go Back Home</a>
        </Link>
    </div>
}