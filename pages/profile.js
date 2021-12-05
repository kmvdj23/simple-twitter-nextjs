import React, { useEffect, useState } from "react"

import {
  Box,
  TableCell,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  styled,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
  Skeleton,
} from "@mui/material"

import withAuthentication from "../components/withAuthentication"
import { authFetch } from "../config/auth"
import { baseUrl } from "../config/baseUrl"
import { getDateTime, stringToAvatar } from "../config/utils"
import theme from "../styles/theme"

const Profile = (props) => {
  const [account, setAccount] = useState({})
  const [isAccountSet, setIsAccountSet] = useState(false)
  const [rows, setRows] = useState([])
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)

  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [alert, setAlert] = useState({
    severity: "info",
    message: "",
  })

  useEffect(() => {
    if (props && props.account && Object.keys(props.account).length) {
      setAccount(props.account)
      setRows([
        ["Username", props.account.username],
        ["Email", props.account.email],
        ["Join date", getDateTime(props.account.create_date)],
      ])
    }
  }, [props])

  useEffect(() => {
    if (Object.keys(account).length) {
      setIsAccountSet(true)
    } else {
      setIsAccountSet(false)
    }
  }, [account])

  useEffect(() => {
    if (password && passwordRepeat && password == passwordRepeat) {
      setIsFormValid(true)
    }
  }, [password, passwordRepeat])

  const clearForms = () => {
    setPassword("")
    setPasswordRepeat("")
  }

  const handleCloseChangePasswordModal = () => {
    clearForms()
    setOpenChangePasswordModal(false)
  }

  const handleChangePassword = () => {
    clearForms()
    setOpenChangePasswordModal(false)

    let data = {
      password: password,
    }
    authFetch(baseUrl + "update_password", {
      method: "post",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => setAlert({ ...alert, message: response.message }))
      .catch((error) =>
        console.log(
          "[PASSWORD CHANGE ERROR]".error && error.response
            ? error.response.data
            : error
        )
      )
  }

  return (
    <>
      <Container sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isAccountSet ? (
            <Avatar
              sx={{
                background: theme.palette.primary.dark,
                width: 100,
                height: 100,
              }}
            >
              <Typography variant="h3">
                {stringToAvatar(account.username)}
              </Typography>
            </Avatar>
          ) : (
            <Skeleton variant="circular" width={100} height={100} />
          )}

          {alert.message && (
            <Box width="100%" sx={{ margin: 2 }}>
              <Alert severity={alert.severity} variant="outlined">
                {alert.message}
              </Alert>
            </Box>
          )}

          <TableContainer component={Paper} sx={{ my: 3 }}>
            <Table sx={{ minWidth: 700 }}>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="right">
                      {isAccountSet ? (
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          {row[0]}
                        </Typography>
                      ) : (
                        <Skeleton variant="text" />
                      )}
                    </TableCell>
                    <TableCell>
                      {isAccountSet ? (
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          {row[1]}
                        </Typography>
                      ) : (
                        <Skeleton variant="text" />
                      )}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            onClick={() => setOpenChangePasswordModal(true)}
          >
            Change password
          </Button>
        </Box>
      </Container>
      <Dialog
        open={openChangePasswordModal}
        onClose={handleCloseChangePasswordModal}
      >
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            id="password"
            name="password"
            variant="outlined"
            label="New password"
            type="password"
            autoComplete="current-password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            id="password-repeat"
            name="password-repeat"
            variant="outlined"
            label="Repeat password"
            type="password"
            autoComplete="current-password"
            fullWidth
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePasswordModal}>Cancel</Button>
          <Button disabled={!isFormValid} onClick={handleChangePassword}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
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

export default withAuthentication(Profile)
