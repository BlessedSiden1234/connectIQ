
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Facebook, Instagram, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
    metricName: string;
    MetricIcon: LucideIcon;
    stats: {
        platform: string;
        value: string;
        change: string;
    }[];
};

const platformIcons: { [key: string]: LucideIcon | ((props: any) => JSX.Element) } = {
  Instagram,
  Facebook,
  YouTube: Youtube,
};

export default function StatCard({ metricName, MetricIcon, stats }: StatCardProps) {
    const total = stats.reduce((acc, stat) => {
        const value = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
        const multiplier = stat.value.includes('M') ? 1000000 : stat.value.includes('k') ? 1000 : 1;
        return acc + value * multiplier;
    }, 0);

    const formatTotal = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metricName}</CardTitle>
        <MetricIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatTotal(total)}</div>
      <p className="text-xs text-muted-foreground">Total across all platforms</p>
        <div className="mt-4 space-y-2">
          {stats.map((stat) => {
            const IconComponent = platformIcons[stat.platform];
            return (
              <div key={stat.platform} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span>{stat.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{stat.value}</span>
                  <span
                    className={cn(
                      'text-xs',
                      stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    )}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
