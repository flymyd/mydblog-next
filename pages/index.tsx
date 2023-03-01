import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {Button} from "@fluentui/react-button";
import path from "path";
import {promises as fs} from "fs";


export default function Home(props: any) {
  return (
    <>
      <Button>Get started</Button>
      <Head>
        <title>下北沢研究所</title>
      </Head>
      <main className={styles.main}>
        {props.json}
      </main>
    </>
  )
}

