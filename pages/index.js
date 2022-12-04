import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Table from '../components/Table'

export default function Home() {
  return (
    <div>
      <Head>
        <title>FlexDB</title>
        <meta name="description" content="FlexDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table></Table>
    </div>
  )
}
