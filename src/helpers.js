import { useQuery } from "react-query";
import dayjs from "dayjs";

export const transactions = [
  {
    customer: "jordan",
    desc: "Headphones",
    price: 120,
    date: "2023-01-12"
  },
  {
    customer: "jordan",
    desc: "Speakers ",
    price: 300,
    date: "2023-02-12"
  },
  {
    customer: "jordan",
    desc: "Charging Cable ",
    price: 28,
    date: "2023-03-19"
  },
  {
    customer: "jordan",
    desc: "Smart Lights",
    price: 75,
    date: "2023-03-22"
  },
  {
    customer: "sofia",
    desc: "Soundbar",
    price: 220,
    date: "2023-01-18"
  },
  {
    customer: "sofia",
    desc: "LG Smart TV",
    price: 425,
    date: "2023-01-20"
  },
  {
    customer: "sofia",
    desc: "Razor Headphones",
    price: 150,
    date: "2023-02-12"
  },
  {
    customer: "sofia",
    desc: "Desk Lamp",
    price: 55,
    date: "2023-03-05"
  },
  {
    customer: "sofia",
    desc: "HDMI Cable",
    price: 15,
    date: "2023-03-28"
  },
  {
    customer: "john",
    desc: "(2) 32in. LG Monitors",
    price: 630,
    date: "2023-01-11"
  },
  {
    customer: "john",
    desc: "Macbook Pro",
    price: 1250,
    date: "2023-02-13"
  },
  {
    customer: "john",
    desc: "Wireless Mouse",
    price: 65,
    date: "2023-03-24"
  }
];

// simulate async API to get customers
export async function getUniqueCustomers() {
  await Promise.resolve();
  return [...new Set(transactions.map(item => item.customer))];
}

// custom hook using react query to get unique customers
export const useGetUniqueCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => getUniqueCustomers()
  });
};

// format the price to USD currency
export let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// simulate async API call to get transactions
export async function getTransactions(month, customer) {
  await Promise.resolve();
  // optionally filter by customer name
  const userTransactions = customer
    ? transactions.filter(x => x.customer === customer)
    : transactions;
  // optionally filter by specified month
  return month || month === 0
    ? userTransactions.filter(x => Number(dayjs(x.date).get("month")) === month)
    : userTransactions;
}

// custom hook using react query to get transactions
export const useGetTransactions = (month, customer) => {
  return useQuery({
    queryKey: ["transactions", month, customer],
    queryFn: () => getTransactions(month, customer)
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
