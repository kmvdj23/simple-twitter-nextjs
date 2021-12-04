import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react"

import { Box } from "@mui/material"
import { useRouter } from "next/router"

import { authFetch } from "../config/auth"
import { baseUrl } from "../config/baseUrl"
import Sidebar from "./sidebar"

const AccountLayout = (props) => {
  const { children } = props
  const [account, setAccount] = useState({})
  const router = useRouter()

  useEffect(() => {
    authFetch(baseUrl + "account", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => setAccount(response))
      .catch((error) => {
        console.error(
          "[GET ACCOUNT ERROR]",
          error && error.response ? error.response.data : error
        )
        router.push("/login")
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { account })
    }
    return child
  })

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar account={account} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        {childrenWithProps}
      </Box>
    </Box>
  )
}

export default AccountLayout
