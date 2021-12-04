import React, { useState } from "react"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {
  Alert,
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Link,
} from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"

import { login } from "../config/auth"
import { loginEndpoint } from "../config/endpoints"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
  })
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    let data = {
      username,
      password,
    }
    console.log(data)
    loginEndpoint(username, password)
      .then((response) => {
        login(response.access_token)
        router.push("/placeholder")
      })
      .catch((error) => {
        if (error && error.response) {
          data = error.response.data
          setAlert({
            ...alert,
            message: data.message,
          })
        }
      })
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {alert.message && (
          <Box width="100%" sx={{ margin: 2 }}>
            <Alert severity={alert.severity} variant="outlined">
              {alert.message}
            </Alert>
          </Box>
        )}
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Log in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account yet? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      Tupe Sandbox {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default Login
