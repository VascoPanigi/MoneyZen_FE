"use client";

import { Pie, PieChart } from "recharts";

import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import dayjs from "dayjs"; // Assuming you're using dayjs for date manipulation

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

    chartData = Object.keys(aggregatedData).map((categoryName) => {
      // Generate a random color for each category
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
      return {
        label: categoryName,
        value: aggregatedData[categoryName],
        fill: `#${randomColor}`,
      };
    });

    chartConfig = {
      visitors: {
        label: "Value",
      },
      ...Object.fromEntries(
        Object.keys(aggregatedData).map((categoryName) => [
          categoryName.toLowerCase(),
          {
            label: categoryName,
            color: `#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`,
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
