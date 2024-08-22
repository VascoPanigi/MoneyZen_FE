"use client";

import { Pie, PieChart } from "recharts";

import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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

export function PieChartHome({ transactions, type }) {
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const typeName = type === "INCOME" ? "Income" : "Expenses";

  const currentMonthName = months[currentMonth];

  let chartConfig = {};
  let chartData = {};
  if (transactions && transactions.length > 0) {
    // Step 1: Filter OUTCOME transactions for the current month
    const outcomeTransactionsThisMonth = transactions.filter((transaction) => {
      const transactionDate = dayjs(transaction.date);
      return (
        transaction.category.transactionType === type &&
        transactionDate.month() === currentMonth &&
        transactionDate.year() === currentYear
      );
    });
    // console.log(outcomeTransactionsThisMonth);

    const aggregatedData = outcomeTransactionsThisMonth.reduce((acc, transaction) => {
      const categoryName = transaction.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += transaction.amount;
      return acc;
    }, {});

    // console.log(aggregatedData);

    chartData = Object.keys(aggregatedData).map((categoryName) => ({
      label: categoryName,
      value: aggregatedData[categoryName],
      fill: "#1e5fc8",
    }));

    chartConfig = {
      visitors: {
        label: "Value",
      },
      ...Object.fromEntries(
        Object.keys(aggregatedData).map((categoryName) => [
          categoryName.toLowerCase(),
          {
            label: categoryName,
            color: "#1e5fc8",
          },
        ])
      ),
    };

    // console.log(chartData);
    // console.log(chartConfig);
  }

  return (
    <>
      {/* {selectedWalletTransactions && selectedWalletTransactions.length > 0 && ( */}
      <div className="flex flex-col pie-chart-outer-container">
        <CardHeader className="items-center pb-0 pie-chart-header-container">
          <CardDescription className="pie-chart-header-p">
            {typeName} - {currentMonthName} {currentYear}{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 card-content-pie-chart">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] pie-chart-container">
            <PieChart className="">
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="value" nameKey="label" innerRadius={60} />
            </PieChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 text-sm pie-chart-footer-container">
          <p>Breakdown of your transactions in this month</p>
        </CardFooter> */}
      </div>
      {/* )} */}
    </>
  );
}
