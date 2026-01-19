'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { addDays, format } from 'date-fns';
import { EMOTIONS } from '@/lib/constants';

// Mock data generation
const today = new Date();
const mockData = Array.from({ length: 30 }, (_, i) => {
    const randomEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
    return {
        date: format(addDays(today, -29 + i), 'MMM d'),
        emotion: randomEmotion.name
    }
});

const emotionCounts = mockData.reduce((acc, curr) => {
    acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(emotionCounts).map(([name, count]) => ({
    name,
    count
}));


const chartConfig = EMOTIONS.reduce((acc, emotion, index) => {
    acc[emotion.name] = {
        label: emotion.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`
    };
    return acc;
}, {} as any);


export default function ProgressPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Emotional Journey</CardTitle>
          <CardDescription>
            Here is a summary of your logged emotions over the last 30 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={350}>
                 <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar
                        dataKey="count"
                        radius={8}
                        fill="var(--color-value)"
                    >
                         {chartData.map((entry) => (
                            <Bar
                                key={entry.name}
                                dataKey="count"
                                name={entry.name}
                                fill={chartConfig[entry.name]?.color || '#8884d8'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
