import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stellar Wallet</title>
        <meta name="Create and manage your Stellar account"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      </main>
    </div>
  )
}

export default Home
