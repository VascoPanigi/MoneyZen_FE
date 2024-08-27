"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import dayjs from "dayjs";

export function BarChartHome({ transactions }) {
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = dayjs(transaction.date).format("MMMM YYYY");

    if (!acc[month]) {
      acc[month] = { month, income: 0, outcome: 0 };
    }

    if (transaction.category.transactionType === "INCOME") {
      acc[month].income += transaction.amount;
    } else if (transaction.category.transactionType === "OUTCOME") {
      acc[month].outcome += transaction.amount;
    }

    return acc;
  }, {});

  const chartData = Object.values(monthlyData).reverse();

  const chartConfig = {
    income: {
      label: "Income",
      color: "#3d1ec8",
    },
    outcome: {
      label: "Outcome",
      color: "#1e5fc8",
    },
  };

  return (
    <div className="bar-chart-outer-container">
      <CardHeader className="bar-chart-card-header">
        <CardTitle className="bar-chart-card-title">Income vs. Outcome</CardTitle>
        <CardDescription className="bar-chart-card-description">
          {dayjs().subtract(5, "month").format("MMMM")} - {dayjs().format("MMMM YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="card-content-bar-chart">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} className="" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="income" fill="#3d1ec8" radius={4} />
            <Bar dataKey="outcome" fill="#1e5fc8" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
