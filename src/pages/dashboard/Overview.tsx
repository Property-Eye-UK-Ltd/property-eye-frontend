import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp } from "iconsax-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const Overview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("All Time");

    const periods = ["All Time", "This Month", "Last Week"];

    // Metric cards data
    const metrics = [
        {
            title: "Total fraud Alerts",
            value: "1,459",
            period: "All time",
            change: "+221",
            borderColor: "bg-red-500",
        },
        {
            title: "Commission at Risk",
            value: "£12,898",
            period: "All time",
            change: "+£2,233",
            borderColor: "bg-orange-700",
        },
        {
            title: "Total Recoveries",
            value: "324",
            period: "All time",
            change: "+2",
            borderColor: "bg-green-500",
        },
        {
            title: "Avg. Fraud Likelihood",
            value: "37%",
            period: "All time",
            change: "+2%",
            borderColor: "bg-purple-500",
        },
    ];

    // Donut chart data
    const donutData = [
        { name: "Private Sale", value: 543, color: "#9333EA" },
        { name: "Buyer Intro", value: 233, color: "#3B82F6" },
        { name: "Dual Agency", value: 76, color: "#F97316" },
    ];

    // Table data
    const tableData = [
        { name: "Fredrick Hunt", location: "Ashfield Road", offenses: 24 },
        { name: "Madeline Kahro", location: "Picadilly", offenses: 22 },
        { name: "Fredrick Hunt", location: "Leicester", offenses: 19 },
        { name: "Fredrick Hunt", location: "Manchester", offenses: 19 },
        { name: "Fredrick Hunt", location: "London", offenses: 12 },
    ];

    // Line chart data
    const lineChartData = [
        { month: "Jan", Critical: 45, High: 35, Medium: 25, Low: 15 },
        { month: "Feb", Critical: 52, High: 38, Medium: 28, Low: 18 },
        { month: "Mar", Critical: 48, High: 40, Medium: 30, Low: 20 },
        { month: "Apr", Critical: 55, High: 42, Medium: 32, Low: 22 },
        { month: "May", Critical: 50, High: 38, Medium: 28, Low: 18 },
        { month: "Jun", Critical: 58, High: 45, Medium: 35, Low: 25 },
        { month: "Jul", Critical: 62, High: 48, Medium: 38, Low: 28 },
        { month: "Aug", Critical: 60, High: 50, Medium: 40, Low: 30 },
        { month: "Sep", Critical: 65, High: 52, Medium: 42, Low: 32 },
        { month: "Oct", Critical: 70, High: 55, Medium: 45, Low: 35 },
        { month: "Nov", Critical: 68, High: 53, Medium: 43, Low: 33 },
        { month: "Dec", Critical: 72, High: 58, Medium: 48, Low: 38 },
    ];

    const chartConfig = {
        Critical: {
            label: "Critical",
            color: "#EF4444",
        },
        High: {
            label: "High",
            color: "#F97316",
        },
        Medium: {
            label: "Medium",
            color: "#EAB308",
        },
        Low: {
            label: "Low",
            color: "#6B7280",
        },
    };

    // Calculate donut chart total and percentages
    const donutTotal = donutData.reduce((sum, item) => sum + item.value, 0);
    const donutPercentages = donutData.map((item) => ({
        ...item,
        percentage: Math.round((item.value / donutTotal) * 100),
    }));

    return (
        <DashboardLayout>
            {/* Page Header */}
            <PageHeader
                title="Overview"
                actions={
                    <div className="flex items-center gap-2">
                        {periods.map((period) => (
                            <Button
                                key={period}
                                variant={selectedPeriod === period ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedPeriod(period)}
                                className={cn(
                                    "rounded-full",
                                    selectedPeriod === period &&
                                        "bg-primary text-primary-foreground"
                                )}
                            >
                                {period}
                            </Button>
                        ))}
                    </div>
                }
            />

            {/* Page Content */}
            <div className="max-w-7xl mx-auto w-full p-6 space-y-6">
                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {metrics.map((metric, index) => (
                            <Card key={index} className="relative overflow-hidden">
                                <div
                                    className={cn(
                                        "absolute top-0 left-0 right-0 h-2",
                                        metric.borderColor
                                    )}
                                />
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-normal text-muted-foreground">
                                        {metric.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-3xl font-medium text-foreground">
                                            {metric.value}
                                        </p>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">
                                                {metric.period}
                                            </span>
                                            <span className="flex items-center px-2 py-1 rounded-full gap-1 bg-green-500/10 text-green-600 font-medium">
                                                <ArrowUp size={12} />
                                                {metric.change}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Commission Avoidance Breakdown */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Commission Avoidance Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center gap-8">
                                    <div className="space-y-3">
                                        {donutPercentages.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-sm font-medium text-foreground">
                                                        {item.value}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative flex-shrink-0">
                                        <svg width="140" height="140" viewBox="0 0 140 140">
                                            {donutPercentages.map((item, index, arr) => {
                                                const radius = 55;
                                                const circumference = 2 * Math.PI * radius;
                                                const previousPercentage = arr
                                                    .slice(0, index)
                                                    .reduce((sum, i) => sum + i.percentage, 0);
                                                const dashArray = circumference;
                                                const dashOffset =
                                                    circumference -
                                                    (previousPercentage / 100) * circumference -
                                                    (item.percentage / 100) * circumference;

                                                return (
                                                    <circle
                                                        key={index}
                                                        cx="70"
                                                        cy="70"
                                                        r={radius}
                                                        fill="none"
                                                        stroke={item.color}
                                                        strokeWidth="18"
                                                        strokeDasharray={dashArray}
                                                        strokeDashoffset={dashOffset}
                                                        strokeLinecap="round"
                                                        transform="rotate(-90 70 70)"
                                                        className="transition-all"
                                                    />
                                                );
                                            })}
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Repeat Offenders Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Repeat Offenders (Owners)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead className="text-right">
                                                Offense Counter
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>{row.location}</TableCell>
                                                <TableCell className="text-right">
                                                    {row.offenses}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Fraud Detection Over Time Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Fraud Detection Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={lineChartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#64748B"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="#64748B"
                                            fontSize={12}
                                            domain={[0, 100]}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="Critical"
                                            stroke="#EF4444"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="High"
                                            stroke="#F97316"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="Medium"
                                            stroke="#EAB308"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="Low"
                                            stroke="#6B7280"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
            </div>
        </DashboardLayout>
    );
};

export default Overview;
