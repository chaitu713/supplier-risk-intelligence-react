import type { RiskHistogramBin } from "../../../api/risk";
import { PlotlyChart } from "../../../components/common/PlotlyChart";

interface RiskHistogramChartProps {
  bins: RiskHistogramBin[];
  isLoading: boolean;
}

export function RiskHistogramChart({ bins, isLoading }: RiskHistogramChartProps) {
  const normalizedBins = bins.map((bin) => ({
    ...bin,
    count: Number(bin.count) || 0,
  }));

  return (
    <section className="surface-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--text)]">Risk Score Distribution</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Histogram-style view across current supplier risk score ranges.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[320px] items-end gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="w-full animate-pulse rounded-t-2xl bg-slate-100"
              style={{ height: `${30 + ((index % 4) + 1) * 12}%` }}
            />
          ))}
        </div>
      ) : normalizedBins.length === 0 ? (
        <div className="empty-state px-6 py-16 text-center text-sm">
          No distribution data available yet.
        </div>
      ) : (
        <PlotlyChart
          className="h-[340px]"
          data={[
            {
              type: "bar",
              x: normalizedBins.map((bin) => `${bin.start.toFixed(1)}-${bin.end.toFixed(1)}`),
              y: normalizedBins.map((bin) => bin.count),
              marker: {
                color: "#166534",
                line: { color: "#bbf7d0", width: 1 },
              },
              hovertemplate: "Range %{x}<br>Count %{y}<extra></extra>",
            },
          ]}
          layout={{
            bargap: 0.18,
            margin: { l: 56, r: 20, t: 8, b: 82 },
            xaxis: {
              title: {
                text: "Risk score range",
                font: { size: 12, color: "#64748b" },
                standoff: 18,
              },
              tickangle: normalizedBins.length > 10 ? -35 : 0,
              tickfont: { size: 11, color: "#64748b" },
              tickcolor: "#cbd5e1",
              linecolor: "#cbd5e1",
              automargin: true,
            },
            yaxis: {
              title: {
                text: "Suppliers",
                font: { size: 12, color: "#64748b" },
                standoff: 10,
              },
              tickfont: { size: 11, color: "#64748b" },
              gridcolor: "#dbeafe",
              zerolinecolor: "#dbeafe",
              tickcolor: "#cbd5e1",
              linecolor: "#cbd5e1",
              automargin: true,
            },
          }}
        />
      )}
    </section>
  );
}
