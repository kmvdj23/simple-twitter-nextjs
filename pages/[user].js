import React, { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Avatar,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableBody,
  Paper,
  styled,
  TableRow,
  TableCell
} from "@mui/material"
import { baseUrl } from "../config/baseUrl"
import { getUsers} from "../config/endpoints"
import { authFetch } from "../config/auth"
import withAuthentication from "../components/withAuthentication"
import { Profile } from './profile'
import theme from "../styles/theme"
import { getDateTime, stringToAvatar } from "../config/utils"

const TweetCard = (props) => {
  return (
    <>
      <Card>
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
          subheader={getDateTime(props.date)}
        />
        <Divider />
        <CardContent>
          <Typography variant="h5">{props.text}</Typography>
        </CardContent>
      </Card>
    </>
  )
}

const User = ({data}) => {

  const [user, setUser ] = useState({})
  const [tweets, setTweets] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    authFetch(baseUrl + "account/" + data.username, {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response)
        setRows([
          ["Username", response.username],
          ["Email", response.email],
          ["Join date", getDateTime(response.create_date)],
        ])
      })
      .catch((error) =>
        console.log(
            error && error.response
            ? error.response.data
            : error
        )
      )
    authFetch(baseUrl + "account/" + data.username + "/tweets", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => setTweets(response))
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
      <Container sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              background: theme.palette.primary.dark,
              width: 100,
              height: 100,
            }}
          >
            <Typography variant="h3">
              {stringToAvatar(data.username)}
            </Typography>
          </Avatar>
          <TableContainer component={Paper} sx={{ my: 3 }}>
            <Table sx={{ minWidth: 700 }}>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="right">
                      <Typography variant="h6" sx={{ fontWeight: 400 }}>
                        {row[0]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ fontWeight: 400 }}>
                        {row[1]}
                      </Typography>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      {Boolean(tweets.length) &&
        tweets.map((tweet, index) => (
          <Box key={index} sx={{ p: 1 }}>
              <TweetCard
                text={tweet.text}
                tweet_id={tweet.id}
                username={user.username}
                date={tweet.create_date}
              />
          </Box>
        ))}
      {tweets.length === 0 && (
        <Typography variant="h3" color="GrayText" sx={{ textAlign: "center" }}>
          {"No tweets yet"}
        </Typography>
      )}
    </Box>
  )
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    background: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))


export async function getStaticPaths() {
  const users = await getUsers()
  const paths = users.map(user => ({
    params: {
      user: user.username
    }
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const users = await getUsers()
  let user = users.find((user) => user.username === params.user)

  return {
    props: {
      data: { 'username' : user.username},
    },
  }
}

export default withAuthentication(User)
