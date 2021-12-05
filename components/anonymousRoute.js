import React, { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { useAuth } from "../config/auth"
import Home from "../pages"

export default function anonymousRoute(WrappedContent) {
  return function Bootstrap(props) {
    const [isLoggedIn] = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (isLoggedIn) {
        if (Object.keys(router.query).length && router.query.next) {
          router.push(router.query.next)
        } else {
          router.push("/")
        }
      } else {
        setLoading(false)
      }
    }, [isLoggedIn, router])

    return isLoggedIn && !loading ? (
      <Home {...props} />
    ) : (
      <WrappedContent {...props} />
    )
  }
}
