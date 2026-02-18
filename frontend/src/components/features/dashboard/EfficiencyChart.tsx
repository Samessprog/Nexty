import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import type { ChartDataPoint } from "@/types/dashboard";

interface EfficiencyChartProps {
  data: ChartDataPoint[];
}

type Period = "30d" | "6m" | "1y";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    color: string;
  }[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-slate-700">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function EfficiencyChart({ data }: EfficiencyChartProps) {
  const { t } = useTranslation();
  const [activePeriod, setActivePeriod] = useState<Period>("6m");

  const periods: { key: Period; labelKey: string }[] = [
    { key: "30d", labelKey: "dashboard.chart.thirtyDays" },
    { key: "6m", labelKey: "dashboard.chart.sixMonths" },
    { key: "1y", labelKey: "dashboard.chart.year" },
  ];

  const translatedData = data.map((d) => ({
    ...d,
    month: t(d.monthKey),
  }));

  return (
    <div className="flex h-[400px] flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {t("dashboard.chart.title")}
          </h3>
          <p className="text-xs text-slate-500">
            {t("dashboard.chart.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-1">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setActivePeriod(p.key)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-semibold transition-all",
                activePeriod === p.key
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:bg-white hover:shadow-sm",
              )}
            >
              {t(p.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex-1" data-testid="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={translatedData}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend content={() => null} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="total"
              name={t("dashboard.chart.allSubmissions")}
              fill="rgba(59, 130, 246, 0.08)"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="implemented"
              name={t("dashboard.chart.implemented")}
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: "#10b981" }}
            />
            <Bar
              yAxisId="right"
              dataKey="avgDays"
              name={t("dashboard.chart.avgDays")}
              fill="rgba(234, 88, 12, 0.45)"
              stroke="#c2410c"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
          <span className="text-xs font-medium text-slate-500">
            {t("dashboard.chart.allSubmissions")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
          <span className="text-xs font-medium text-slate-500">
            {t("dashboard.chart.implemented")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-1.5 rounded-sm bg-orange-600" />
          <span className="text-xs font-medium text-slate-500">
            {t("dashboard.chart.avgDays")}
          </span>
        </div>
      </div>
    </div>
  );
}
