import React, { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { useAuth } from "../config/auth"
import customStorage from "../config/customStorage"
import Login from "../pages/login"

export default function withAuthentication(WrappedContent) {
  return function Bootstrap(props) {
    const [isLoggedIn] = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const cookies = customStorage

    useEffect(() => {
      if (Boolean(cookies.getItem("access_token")) === false) {
        router.push(`/login?next=${router.asPath}`, undefined, { shallow: true })
      } else {
        setLoading(false)
      }
    }, [router, cookies])

    return !loading && !isLoggedIn ? <Login /> : <WrappedContent {...props} />
  }
}
