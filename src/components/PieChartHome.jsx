"use client";

import { Pie, PieChart } from "recharts";

import { CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; // Assuming you're using dayjs for date manipulation

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// };

export function PieChartHome() {
  const selectedWalletTransactions = useSelector((state) => state.transactions.wallet_transactions.content);
  const transactionCategories = useSelector((state) => state.transaction_categories);
  console.log(selectedWalletTransactions);

  // Get the current month and year
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  // Step 1: Filter OUTCOME transactions for the current month
  const outcomeTransactionsThisMonth = selectedWalletTransactions.filter((transaction) => {
    const transactionDate = dayjs(transaction.date);
    return (
      transaction.category.transactionType === "OUTCOME" &&
      transactionDate.month() === currentMonth &&
      transactionDate.year() === currentYear
    );
  });

  const aggregatedData = outcomeTransactionsThisMonth.reduce((acc, transaction) => {
    const categoryName = transaction.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += transaction.amount;
    return acc;
  }, {});

  console.log(aggregatedData);

  const chartData = Object.keys(aggregatedData).map((categoryName) => ({
    label: categoryName,
    value: aggregatedData[categoryName],
    fill: "#14715d",
  }));

  const chartConfig = {
    visitors: {
      label: "Value",
    },
    ...Object.fromEntries(
      Object.keys(aggregatedData).map((categoryName) => [
        categoryName.toLowerCase(),
        {
          label: categoryName,
          color: "#14715d",
        },
      ])
    ),
  };

  console.log(chartData);
  console.log(chartConfig);
  return (
    <>
      {/* {selectedWalletTransactions && selectedWalletTransactions.length > 0 && ( */}
      <div className="flex flex-col pie-chart-outer-container">
        <CardHeader className="items-center pb-0">
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 card-content-pie-chart">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] pie-chart-container">
            <PieChart className="">
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="value" nameKey="label" innerRadius={60} />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">Breakdown of your transactions in this month</div>
        </CardFooter>
      </div>
      {/* )} */}
    </>
  );
}
