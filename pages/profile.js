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
} from "@mui/material"

import theme from "../styles/theme"

const Profile = (props) => {
  const [account, setAccount] = useState({})
  const [rows, setRows] = useState([])

  useEffect(() => {
    console.log("@@@@@@", account)
    if (props.account) {
      setAccount(props.account)
      setRows([
        ["Username", props.account.username],
        ["Email", props.account.email],
      ])
    }
  }, [props.account, account])

  return (
    Object.keys(account).length && (
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
            sx={{ background: theme.palette.primary.dark, width: 100, height: 100 }}
          >
            <Typography variant="h3">{stringToAvatar(account.username)}</Typography>
          </Avatar>
          <Box sx={{ p: 3 }}></Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell component="th" align="right" scope="row">
                      {row[0]}
                    </TableCell>
                    <TableCell>{row[1]}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    )
  )
}

const stringToAvatar = (name) => {
  const names = name.split(" ")

  console.log(names.length)

  if (names.length < 2) {
    return names[0][0].toUpperCase()
  } else {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    background: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

export default Profile

// import React from "react"

// import {
//   Avatar,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Typography,
// } from "@mui/material"
// import { Box, styled } from "@mui/system"

// import theme from "../styles/theme"

// const Profile = (props) => {
//   const { account } = props
//   // const rows = [
//   //   ("Username", account && account.username),
//   //   ("Email", account && account.email),
//   // ]
//   // console.log(rows)
//   return (
//     <Box>
//       <Avatar
//         sx={{ background: theme.palette.primary.dark, width: 100, height: 100 }}
//       >
//         <Typography variant="h3">{stringToAvatar(account.username)}</Typography>
//       </Avatar>
//       {/* <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }}>
//           <TableBody>
//             {rows.map((row, index) => (
//               <StyledTableRow key={index}>
//                 <TableCell component="th" align="right" scope="row">
//                   {row[0]}
//                 </TableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer> */}
//     </Box>
//   )
// }

// const stringToAvatar = (name) => {
//   console.log("!!!!!!!!!!!!!!!", name)
//   const names = name.split(" ")

//   console.log(names.length)

//   if (names.length < 2) {
//     return names[0][0].toUpperCase()
//   } else {
//     return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
//   }
// }

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     background: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }))

// export default Profile
