import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import EfficiencyChart from "@/components/features/dashboard/EfficiencyChart";
import TestWrapper from "@/test/TestI18nProvider";
import type { ChartDataPoint } from "@/types/dashboard";

vi.mock("recharts", async () => {
  const actual = await vi.importActual("recharts");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <div style={{ width: 500, height: 300 }}>{children}</div>
    ),
  };
});

const mockData: ChartDataPoint[] = [
  {
    monthKey: "dashboard.chart.months.jan",
    total: 5,
    implemented: 2.5,
    avgDays: 14,
  },
  {
    monthKey: "dashboard.chart.months.feb",
    total: 7.5,
    implemented: 3.75,
    avgDays: 12,
  },
  {
    monthKey: "dashboard.chart.months.mar",
    total: 15,
    implemented: 10,
    avgDays: 8,
  },
];

describe("EfficiencyChart", () => {
  it("renders the chart title", () => {
    render(
      <TestWrapper>
        <EfficiencyChart data={mockData} />
      </TestWrapper>,
    );
    expect(screen.getByText("Submission Efficiency")).toBeInTheDocument();
  });

  it("renders the chart container", () => {
    render(
      <TestWrapper>
        <EfficiencyChart data={mockData} />
      </TestWrapper>,
    );
    expect(screen.getByTestId("chart-container")).toBeInTheDocument();
  });

  it("renders legend items", () => {
    render(
      <TestWrapper>
        <EfficiencyChart data={mockData} />
      </TestWrapper>,
    );
    expect(screen.getByText("All submissions")).toBeInTheDocument();
    expect(screen.getByText("Implemented")).toBeInTheDocument();
    expect(
      screen.getByText("Avg. Implementation Time (days)"),
    ).toBeInTheDocument();
  });

  it("renders period buttons", () => {
    render(
      <TestWrapper>
        <EfficiencyChart data={mockData} />
      </TestWrapper>,
    );
    expect(screen.getByText("30 Days")).toBeInTheDocument();
    expect(screen.getByText("6 Months")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
  });
});
