import React, { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  Typography,
  Link
} from "@mui/material"
import withAuthentication from "../components/withAuthentication"
import { authFetch } from "../config/auth"
import { baseUrl } from "../config/baseUrl"
import { stringToAvatar } from "../config/utils"
import theme from "../styles/theme"
import { getUsers } from "../config/endpoints"

const UserCard = (props) => {
  return (
    <Card>
      <CardActionArea component={Link} href={props.username}>
        <CardHeader
            avatar={
              <Avatar
                sx={{ background: theme.palette.primary.dark, width: 50, height: 50 }}
              >
                {stringToAvatar(props.username)}
              </Avatar>
            }
            title={
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                {props.username}
              </Typography>
            }
          />
        </CardActionArea>
    </Card>
  )
}


const Users = (props) => {
  const [users, setUsers ] = useState([])

  useEffect(() => {
    authFetch(baseUrl + "users", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => setUsers(response))
      .catch((error) =>
        console.log(
            error && error.response
            ? error.response.data
            : error
        )
      )
  }, [])

  return (
    <Box height="100%">
      {Boolean(users.length) &&
        users.map((user, index) => (
          <Box key={index} sx={{ p: 1 }}>
              <UserCard username={user.username} />
          </Box>
        ))}
    </Box>
  )
}

export default withAuthentication(Users)
