import { useQuery } from "react-query";
import dayjs from "dayjs";

export const transactions = [
  {
    desc: "Headphones",
    price: 120,
    date: "2023-01-12"
  },
  {
    desc: "Speakers ",
    price: 300,
    date: "2023-02-12"
  },
  {
    desc: "Charging Cable ",
    price: 28,
    date: "2023-03-19"
  },
  {
    desc: "Smart Lights",
    price: 75,
    date: "2023-03-22"
  }
];

// format the price to USD currency
export let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// simulate async API call to get transactions
export async function getTransactions(month) {
  await Promise.resolve();
  return month || month === 0
    ? transactions.filter(x => Number(dayjs(x.date).get("month")) === month)
    : transactions;
}

// custom hook using react query to get transactions
export const useGetTransactions = month => {
  return useQuery({
    queryKey: ["transactions", month],
    queryFn: () => getTransactions(month)
  });
};

// helper function to get points from transactions
export function getPointsFromTransactions(transactions) {
  let points = 0;
  transactions &&
    transactions.map(tran => {
      // if price is less than 50, no additional points added
      if (tran.price <= 50) {
        points = points;
      }
      // if price is between 50 and 100, subtract 50 from price and add remainder to points
      else if (tran.price > 50 && tran.price <= 100) {
        points += tran.price - 50;
      }
      // if price is greater than 100, add 50 points and 2x points for every dollar above 100
      else if (tran.price > 100) {
        points += 50 + (tran.price - 100) * 2;
      }
    });
  return points;
}
