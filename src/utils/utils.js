import moment from "moment";

// Group transactions by month
export const groupTransactionsByMonth = (transactions) => {
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const month = moment(transaction.date).format("YYYY-MM");
    if (!acc[month]) acc[month] = [];
    acc[month].push(transaction);
    return acc;
  }, {});

  // console.log("Grouped Transactions by Month:", groupedTransactions);
  return groupedTransactions;
};

// Calculate monthly totals for income and outcome
export const calculateMonthlyTotals = (groupedTransactions) => {
  const totals = {};

  Object.keys(groupedTransactions).forEach((month) => {
    const transactions = groupedTransactions[month];

    const income = transactions
      .filter((t) => t.category.transactionType === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);

    const outcome = transactions
      .filter((t) => t.category.transactionType === "OUTCOME")
      .reduce((sum, t) => sum + t.amount, 0);

    totals[month] = { income, outcome, total: income - outcome };
  });
  // console.log("Monthly Totals:", totals);
  return totals;
};

// date formatter dd-mm-yyyy
export const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

// date formatter dd-mm-yyyy hh-mm
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };

  const formattedDate = new Intl.DateTimeFormat("en-GB", optionsDate).format(date);
  const formattedTime = new Intl.DateTimeFormat("en-GB", optionsTime).format(date);

  return `${formattedDate} ${formattedTime}`;
};
