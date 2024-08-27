"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartConfig = {
  desktop: {
    label: "Balance",
    color: "#14715d",
  },
};

export function LargeChart({ transactions, balance }) {
  console.log(transactions);
  console.log(balance);

  const [timeRange, setTimeRange] = React.useState("90d");

  const generateChartData = (transactions, initialBalance) => {
    const now = new Date();
    const startDate = new Date();
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    // Initialize the balance tracking
    let cumulativeBalance = initialBalance;
    const balanceByDate = {};

    // Sort transactions by date (descending order)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    const lastTransactionDate = new Date(transactions[0]?.date);

    let endingDate = null;

    if (startDate < lastTransactionDate) {
      startDate.setDate(lastTransactionDate.getDate() - daysToSubtract);
      endingDate = lastTransactionDate;
    } else {
      startDate.setDate(now.getDate() - daysToSubtract);
      endingDate = new Date();
    }

    // this line ensure that every transaction made on the same day is visible on the chart
    endingDate.setDate(lastTransactionDate.getDate() + 1);

    // Populate the balanceByDate with transactions
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const dateStr = transactionDate.toISOString().split("T")[0];
      console.log(transaction);

      if (transactionDate >= startDate) {
        if (!balanceByDate[dateStr]) {
          balanceByDate[dateStr] = 0;
        }
        if (transaction.category.transactionType === "INCOME") {
          balanceByDate[dateStr] += transaction.amount;
        } else if (transaction.category.transactionType === "OUTCOME") {
          balanceByDate[dateStr] -= transaction.amount;
        }
      }
    });

    const chartData = [];
    console.log(endingDate);

    for (let d = endingDate; d >= startDate; d.setDate(d.getDate() - 1)) {
      const dateStr = d.toISOString().split("T")[0];

      if (balanceByDate[dateStr] !== undefined) {
        cumulativeBalance -= balanceByDate[dateStr];
      }

      chartData.unshift({
        date: dateStr,
        desktop: cumulativeBalance,
      });
    }

    return chartData;
  };

  const chartData = generateChartData(transactions, balance);

  console.log(chartData);

  return (
    <div className="bar-chart-outer-container">
      <CardHeader className="bar-chart-card-header large-chart-header">
        <div>
          <CardTitle className="bar-chart-card-title">Balance trend</CardTitle>
          <CardDescription className="bar-chart-card-description">
            Showing balance fluctuation over the past 3 months
          </CardDescription>
        </div>
        <div className="button-container-large-chart">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto large-chart-button" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl large-chart-button-content-selection">
              <SelectItem value="90d" className="rounded-lg large-chart-button-item">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg large-chart-button-item">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg large-chart-button-item">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 large-chart-content-container">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full chart-content-container">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={1} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
