import React, { useEffect, useState } from "react"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import FeedIcon from "@mui/icons-material/Feed"
import LogoutIcon from "@mui/icons-material/Logout"
import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
  Typography,
  Skeleton,
} from "@mui/material"
import { useRouter } from "next/router"

import { authFetch, logout } from "../config/auth"
import { baseUrl } from "../config/baseUrl"
import { stringToAvatar } from "../config/utils"
import theme from "../styles/theme"

const Sidebar = (props) => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const router = useRouter()

  const [account, setAccount] = useState({})
  const [isAccountSet, setIsAccountSet] = useState(false)

  useEffect(() => {
    if (props && props.account && Object.keys(props.account).length) {
      setAccount(props.account)
    }
  }, [props])

  useEffect(() => {
    if (Object.keys(account).length) {
      setIsAccountSet(true)
    } else {
      setIsAccountSet(false)
    }
  }, [account])

  const handleLogout = () => {
    setOpenLogoutModal(false)
    authFetch(baseUrl + "logout", {
      method: "post",
    })
      .then((response) => response.json())
      .then(() => {
        router.push("/login")
        logout()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            background: theme.palette.secondary.main,
          },
        }}
        open
      >
        <CardHeader
          avatar={
            isAccountSet ? (
              <Avatar sx={{ background: theme.palette.primary.dark }}>
                {stringToAvatar(props.account.username)}
              </Avatar>
            ) : (
              <Skeleton variant="circular" width={40} height={40} />
            )
          }
          title={
            isAccountSet ? (
              <Typography variant="h6">{props.account.username}</Typography>
            ) : (
              <Skeleton variant="text" />
            )
          }
        />
        <Divider />
        <List>
          <ListItemButton component={Link} href="/profile">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
          <ListItemButton component={Link} href="/">
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary="Feed" />
          </ListItemButton>
          <ListItemButton onClick={() => setOpenLogoutModal(true)}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
      <Dialog open={openLogoutModal} onClose={() => setOpenLogoutModal(false)}>
        <DialogTitle>Confirm logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutModal(false)}>Cancel</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Sidebar
