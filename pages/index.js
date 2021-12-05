import React, { useEffect, useState } from "react"

import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import {
  Box,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material"

import withAuthentication from "../components/withAuthentication"
import { authFetch } from "../config/auth"
import { baseUrl } from "../config/baseUrl"
import { getDateTime, stringToAvatar } from "../config/utils"
import theme from "../styles/theme"

const Home = (props) => {
  const [tweets, setTweets] = useState([])
  const [tweet, setTweet] = useState("")
  const [openAddTweetModal, setOpenAddTweetModal] = useState(false)

  useEffect(() => {
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", props)
    if (props && props.account && Object.keys(props.account).length) {
      // console.log(props.account)
      refreshTweets()
    }
  }, [props])

  const refreshTweets = () => {
    authFetch(baseUrl + "tweets", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => setTweets(response))
      .catch((error) =>
        console.error(
          "[GET TWEETS ERROR]",
          error && error.response ? error.response.data : error
        )
      )
  }

  const handlePostTweet = () => {
    setOpenAddTweetModal(false)
    setTweet("")

    let data = {
      text: tweet,
    }
    authFetch(baseUrl + "tweet", {
      method: "post",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        refreshTweets()
      })
      .catch((error) =>
        console.error(
          "[POST TWEET ERROR]",
          error && error.response ? error.response.data : error
        )
      )
  }

  return props && props.account && Object.keys(props.account).length ? (
    <Box height="100%">
      {tweets.map((tweet, index) => (
        <Box key={index} sx={{ p: 1 }}>
          <TweetCard
            text={tweet.text}
            tweet_id={tweet.id}
            username={props.account.username}
            date={tweet.create_date}
            refreshTweets={refreshTweets}
          />
        </Box>
      ))}
      <Fab
        color="primary"
        aria-label="add-tweet"
        sx={{ position: "sticky", bottom: 16, float: "right" }}
        onClick={() => setOpenAddTweetModal(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog open={openAddTweetModal} onClose={() => setOpenAddTweetModal(false)}>
        <DialogTitle>Post a tweet</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            id="tweet"
            name="tweet"
            variant="outlined"
            multiline
            rows={5}
            sx={{ minWidth: 350 }}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTweetModal(false)}>Cancel</Button>
          <Button onClick={handlePostTweet}>Post</Button>
        </DialogActions>
      </Dialog>
    </Box>
  ) : (
    <h1></h1>
  )
}

const TweetCard = (props) => {
  const [openDeleteTweetModal, setOpenDeleteTweetModal] = useState(false)

  const handleDeleteTweet = () => {
    setOpenDeleteTweetModal(false)
    authFetch(baseUrl + `delete_tweet/${props.tweet_id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then(() => props.refreshTweets())
      .catch((error) =>
        console.error(
          "[DELETE TWEET ERROR]",
          error && error.response ? error.response.data : error
        )
      )
  }

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
        <CardActions disableSpacing>
          <IconButton
            aria-label="delete-tweet"
            size="small"
            sx={{ marginLeft: "auto" }}
            color="error"
            onClick={() => setOpenDeleteTweetModal(true)}
          >
            <CloseIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={openDeleteTweetModal}
        onClose={() => setOpenDeleteTweetModal(false)}
      >
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this tweet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteTweetModal(false)}>Cancel</Button>
          <Button onClick={handleDeleteTweet}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withAuthentication(Home)
