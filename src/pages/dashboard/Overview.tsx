import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, Profile2User, ChartCircle, Diagram } from "iconsax-react";
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
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, ComposedChart } from "recharts";

interface PeriodTabsProps {
    periods: string[];
    selected: string;
    onSelect: (value: string) => void;
}

const PeriodTabs = ({ periods, selected, onSelect }: PeriodTabsProps) => (
    <div className="inline-flex rounded-lg border border-border bg-white overflow-hidden">
        {periods.map((period, index) => {
            const isActive = selected === period;
            return (
                <button
                    key={period}
                    className={cn(
                        "px-5 py-2 text-sm font-medium transition-colors focus:outline-none",
                        index !== 0 && "border-l border-border/70",
                        isActive
                            ? "bg-[#F4F6F9] text-foreground"
                            : "text-muted-foreground hover:bg-muted/30"
                    )}
                    onClick={() => onSelect(period)}
                >
                    {period}
                </button>
            );
        })}
    </div>
);

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

    // Line chart data - more sporadic
    const lineChartData = [
        { month: "Jan", Critical: 70, High: 40, Medium: 42, Low: 42 },
        { month: "Feb", Critical: 18, High: 20, Medium: 20, Low: 50 },
        { month: "Mar", Critical: 35, High: 42, Medium: 35, Low: 38 },
        { month: "Apr", Critical: 82, High: 70, Medium: 40, Low: 82 },
        { month: "May", Critical: 40, High: 70, Medium: 70, Low: 15 },
        { month: "Jun", Critical: 10, High: 98, Medium: 20, Low: 15 },
        { month: "Jul", Critical: 55, High: 95, Medium: 55, Low: 50 },
        { month: "Aug", Critical: 15, High: 40, Medium: 40, Low: 35 },
        { month: "Sep", Critical: 57, High: 82, Medium: 82, Low: 95 },
        { month: "Oct", Critical: 52, High: 28, Medium: 55, Low: 95 },
        { month: "Nov", Critical: 90, High: 62, Medium: 70, Low: 55 },
        { month: "Dec", Critical: 42, High: 88, Medium: 65, Low: 15 },
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


    return (
        <DashboardLayout>
            {/* Page Header */}
            <PageHeader
                title="Overview"
                actions={
                    <PeriodTabs
                        periods={periods}
                        selected={selectedPeriod}
                        onSelect={setSelectedPeriod}
                    />
                }
            />

            {/* Page Content */}
            <div className="max-w-7xl mx-auto w-full px-6 py-6 space-y-4">
                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        {/* Commission Avoidance Breakdown */}
                        <DashboardPanel
                            title="Commission Avoidance Breakdown"
                            icon={<ChartCircle size={18} variant="Bulk" className="text-muted-foreground" />}
                            className="lg:col-span-2"
                            hasBorder={true}
                        >
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative flex-shrink-0">
                                    <ResponsiveContainer width={140} height={140}>
                                        <PieChart>
                                            <Pie
                                                data={donutData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={64}
                                                paddingAngle={2}
                                                dataKey="value"
                                                cornerRadius={8}
                                            >
                                                {donutData.map((entry, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={entry.color}
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-3 w-full">
                                    {donutData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <span className="text-sm text-muted-foreground">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-foreground">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DashboardPanel>

                        {/* Repeat Offenders Table */}
                        <DashboardPanel
                            title="Repeat Offenders (Owners)"
                            icon={<Profile2User size={16} variant="TwoTone" className="text-muted-foreground" />}
                            className="lg:col-span-3 overflow-hidden"
                            noPadding={true}
                            hasBorder={true}
                        >
                            <Table className="justify-between">
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-menu px-4">Name</TableHead>
                                        <TableHead className="font-menu px-4">Location</TableHead>
                                        <TableHead className="font-menu px-4">
                                            Offense Counter
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tableData.map((row, index) => (
                                        <TableRow key={index} className="border-b border-border">
                                            <TableCell className="font-normal px-4 py-3">
                                                {row.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3">{row.location}</TableCell>
                                            <TableCell className="font-normal px-4 py-3">
                                                {row.offenses}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </DashboardPanel>
                    </div>

                    {/* Fraud Detection Over Time Chart */}
                    <DashboardPanel
                        title="Fraud Detection Over Time"
                        icon={<Diagram size={16} variant="TwoTone" className="text-muted-foreground" />}
                        hasBorder={true}
                        actions={
                            <div className="flex items-center gap-4">
                                {Object.entries(chartConfig).map(([key, config]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: config.color }}
                                        />
                                        <span className="text-xs text-muted-foreground">{config.label}</span>
                                    </div>
                                ))}
                            </div>
                        }
                    >
                            <ChartContainer config={chartConfig} className="h-[200px] w-full -ml-8">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={lineChartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="gradientCritical" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                                                <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="gradientHigh" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                                                <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="gradientMedium" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#EAB308" stopOpacity={0.3} />
                                                <stop offset="100%" stopColor="#EAB308" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="gradientLow" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#6B7280" stopOpacity={0.3} />
                                                <stop offset="100%" stopColor="#6B7280" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
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
                                        <Area
                                            type="linear"
                                            dataKey="Critical"
                                            fill="url(#gradientCritical)"
                                            stroke="none"
                                        />
                                        <Area
                                            type="linear"
                                            dataKey="High"
                                            fill="url(#gradientHigh)"
                                            stroke="none"
                                        />
                                        <Area
                                            type="linear"
                                            dataKey="Medium"
                                            fill="url(#gradientMedium)"
                                            stroke="none"
                                        />
                                        <Area
                                            type="linear"
                                            dataKey="Low"
                                            fill="url(#gradientLow)"
                                            stroke="none"
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="Critical"
                                            stroke="#EF4444"
                                            strokeWidth={1.5}
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 5 }}
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="High"
                                            stroke="#F97316"
                                            strokeWidth={1.5}
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 5 }}
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="Medium"
                                            stroke="#EAB308"
                                            strokeWidth={1.5}
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 5 }}
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="Low"
                                            stroke="#6B7280"
                                            strokeWidth={1.5}
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 5 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                    </DashboardPanel>
            </div>
        </DashboardLayout>
    );
};

export default Overview;
