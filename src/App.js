import React from "react";
// data & helper functions
import {
  useGetTransactions,
  getPointsFromTransactions,
  USDollar,
  useGetUniqueCustomers
} from "./helpers";
import dayjs from "dayjs";
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
// button group
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function App() {
  const customers = useGetUniqueCustomers();
  const [customer, setCustomer] = React.useState(undefined);
  const [month, setMonth] = React.useState(undefined);
  const { data, isLoading } = useGetTransactions(month, customer);
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Bert's Electronics - Rewards
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="container">
        <div className="row mt-2">
          <div className="col-12 col-md-6 text-center text-md-start">
            <Typography
              className="mb-3"
              variant="h4"
              color="inherit"
              component="div"
            >
              Customers
            </Typography>
            <div>
              <Button
                variant="contained"
                onClick={() => setCustomer(undefined)}
              >
                All Transactions
              </Button>
              &nbsp;&nbsp;
              {customers.data ? (
                customers.data.map(c => (
                  <>
                    <Button variant="contained" onClick={() => setCustomer(c)}>
                      {c}
                    </Button>
                    &nbsp;&nbsp;
                  </>
                ))
              ) : (
                <>no customers</>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 text-center">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => setMonth(undefined)}>All</Button>
              <Button onClick={() => setMonth(0)}>Jan</Button>
              <Button onClick={() => setMonth(1)}>Feb</Button>
              <Button onClick={() => setMonth(2)}>March</Button>
            </ButtonGroup>
            <Typography
              className="mt-3"
              variant="h6"
              color="inherit"
              component="div"
            >
              Total Points:
            </Typography>
            <Typography variant="h4" color="inherit" component="div">
              {getPointsFromTransactions(data)}
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
              Customer Transactions
            </Typography>
            {/* Loading UI */}
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
                        <TableCell>Customer</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Points</TableCell>
                        <TableCell align="right">Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data ? (
                        // transactions loaded UI
                        data.map(transaction => (
                          <TableRow
                            key={transaction.desc}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 }
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {/* capitalize first letter of name */}
                              {transaction.customer.charAt(0).toUpperCase() +
                                transaction.customer.slice(1)}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {transaction.desc}
                            </TableCell>
                            <TableCell align="right">
                              {USDollar.format(transaction.price)}
                            </TableCell>
                            <TableCell align="right">
                              {getPointsFromTransactions([transaction])} pts
                            </TableCell>
                            <TableCell align="right">
                              {dayjs(transaction.date).format("MM/DD/YYYY")}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        // no transactions UI
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
