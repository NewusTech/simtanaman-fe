"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", diajukan: 186, disetujui: 80 },
  { month: "February", diajukan: 305, disetujui: 200 },
  { month: "March", diajukan: 237, disetujui: 120 },
  { month: "April", diajukan: 73, disetujui: 190 },
  { month: "May", diajukan: 209, disetujui: 130 },
  { month: "June", diajukan: 214, disetujui: 140 },
];

const chartConfig = {
  diajukan: {
    label: "Diajukan",
    color: "#858590",
  },
  disetujui: {
    label: "Disetujui",
    color: "#388E3C",
  },
  // direvisi: {
  //     label: "Direvisi",
  //     color: "#D39C55",
  // },
  ditolak: {
      label: "Ditolak",
      color: '#F54444',
  },
} satisfies ChartConfig;

export function LineChartInfo() {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid
          vertical={false}
          horizontal={true}
          className="bg-neutral-50"
        />
        <XAxis
          dataKey="month"
          tickLine={true}
          axisLine={true}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel className="bg-white" />}
        />
        <Line
          dataKey="diajukan"
          type="linear"
          stroke="var(--color-diajukan)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="disetujui"
          type="linear"
          stroke="var(--color-disetujui)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
