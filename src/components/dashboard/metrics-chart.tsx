
'use client';

import { useEffect, useState } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartTooltipContent, type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Skeleton } from '../ui/skeleton';

const chartData = [
  { month: 'Jan', instagram: 100, tiktok: 150, facebook: 80, youtube: 40 },
  { month: 'Feb', instagram: 120, tiktok: 180, facebook: 85, youtube: 55 },
  { month: 'Mar', instagram: 110, tiktok: 220, facebook: 90, youtube: 70 },
  { month: 'Apr', instagram: 130, tiktok: 250, facebook: 95, youtube: 80 },
  { month: 'May', instagram: 150, tiktok: 280, facebook: 100, youtube: 90 },
  { month: 'Jun', instagram: 160, tiktok: 310, facebook: 105, youtube: 110 },
];

const chartConfig = {
  instagram: {
    label: 'Instagram',
    color: 'hsl(var(--chart-1))',
  },
  facebook: {
    label: 'Facebook',
    color: 'hsl(var(--chart-3))',
  },
  youtube: {
    label: 'YouTube',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export default function MetricsChart() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Skeleton className="h-[350px] w-full" />;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Legend content={<ChartLegendContent />} />
        {Object.keys(chartConfig).map((key) => (
          <Line
            key={key}
            dataKey={key}
            stroke={chartConfig[key as keyof typeof chartConfig].color}
            strokeWidth={2}
            dot={false}
            type="monotone"
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
