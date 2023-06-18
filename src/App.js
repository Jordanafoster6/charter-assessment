import React from "react";
import "./App.css";
// data & helper functions
import {
  transactions,
  useGetTransactions,
  getPointsFromTransactions,
  USDollar
} from "./helpers";
// header
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  const { data, isLoading } = useGetTransactions();
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Bert's Electronics Rewards
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="container">
        <div className="row mt-2">
          <div className="col-12 col-md-6 text-center text-md-start">
            <Typography variant="h3" color="inherit" component="div">
              Welcome Charles!
            </Typography>
            <Typography variant="body1" color="inherit" component="div">
              As a customer you receive 2 points for every dollar spent over
              $100 in each transaction, plus 1 point for every dollar spent
              between $50 and $100 in each transaction.
            </Typography>
          </div>
          <div className="col-12 col-md-6 text-center">
            <Typography
              className="mt-3"
              variant="h6"
              color="inherit"
              component="div"
            >
              Total Points:
            </Typography>
            <Typography variant="h4" color="inherit" component="div">
              {getPointsFromTransactions(transactions)}
            </Typography>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <Typography
              variant="h5"
              color="inherit"
              component="div"
              style={{ textAlign: "left" }}
            >
              Your Transactions
            </Typography>
            {isLoading ? (
              <Typography
                variant="h2"
                color="inherit"
                component="div"
                style={{ textAlign: "left" }}
              >
                Loading...
              </Typography>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data ? (
                        data.map(transaction => (
                          <TableRow
                            key={transaction.desc}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 }
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {transaction.desc}
                            </TableCell>
                            <TableCell align="right">
                              {USDollar.format(transaction.price)}
                            </TableCell>
                            <TableCell align="right">
                              {getPointsFromTransactions([transaction])} pts
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <Typography
                            variant="h4"
                            color="inherit"
                            component="div"
                          >
                            No Transactions
                          </Typography>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
