import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Engine from '../components/Engine'

export default function Home() {
  return (
    <div>
      <Head>
        <title>FlexDB</title>
        <meta name="description" content="FlexDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Engine></Engine>
    </div>
  )
}
