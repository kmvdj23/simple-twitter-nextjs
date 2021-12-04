import React from "react"

import "../styles/globals.css"
import { CacheProvider } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import Head from "next/head"

import AccountLayout from "../components/layouts"
import { useAuth } from "../config/auth"
import createEmotionCache from "../config/createEmotionCache"
import theme from "../styles/theme"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [isLoggedIn] = useAuth()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Sample Tweet</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? (
          <AccountLayout>
            <Component {...pageProps} />
          </AccountLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </CacheProvider>
  )
}
