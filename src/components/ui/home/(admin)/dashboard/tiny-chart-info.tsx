import { CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

type TinyBarChartProps = {
    data: { month: string; desktop: number }[];
    barColor?: string;
    width?: number;
    height?: number;
};

const chartConfig = {
  desktop: {
    label: "Value",
    color: "#80AC6C",
  },
} satisfies ChartConfig;

export function TinyBarChart({
    data,
    barColor = "#80AC6C",
    width = 100,
    height = 100,
}: TinyBarChartProps) {
    return (
        data.every((item: { month: string; desktop: number }) => item.desktop === 0) ? (
          <CardContent className="flex items-center justify-center h-full">
            <span>Tidak ada data</span>
          </CardContent>
        ) : (
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
            accessibilityLayer
            data={data}
            layout="horizontal"
            margin={{
              bottom: 0,
            }}
            barSize={50}
            width={width}
            height={height}
              >
            <XAxis
              type="category"
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis type="number" dataKey="desktop" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="bg-white" />}
            />
            <Bar dataKey="desktop" fill={barColor} radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        )
    );
}
