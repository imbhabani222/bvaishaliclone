import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"
import HomePage from "./home"
import Cookies from "universal-cookie"
import Script from "next/script"
export default function Home() {
  return (
    <>
      <Head>
        <title>BVaishali</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  )
}
