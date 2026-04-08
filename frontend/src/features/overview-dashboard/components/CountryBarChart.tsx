import type { CountryDistributionItem } from "../../../api/analytics";
import { PlotlyChart } from "../../../components/common/PlotlyChart";

interface CountryBarChartProps {
  items: CountryDistributionItem[];
  isLoading: boolean;
}

export function CountryBarChart({ items, isLoading }: CountryBarChartProps) {
  return (
    <section className="surface-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--text)]">Suppliers by Country</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Top supplier geographies from the current network.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state px-6 py-16 text-center text-sm">
          No country distribution data available yet.
        </div>
      ) : (
        <PlotlyChart
          className="h-[340px]"
          data={[
            {
              type: "bar",
              orientation: "h",
              y: items.map((item) => item.country).reverse(),
              x: items.map((item) => item.supplierCount).reverse(),
              marker: {
                color: "#166534",
                line: { color: "#bbf7d0", width: 1 },
              },
              hovertemplate: "%{y}: %{x}<extra></extra>",
            },
          ]}
          layout={{
            margin: { l: 90, r: 24, t: 8, b: 36 },
            xaxis: {
              title: { text: "Suppliers" },
              gridcolor: "#d9ddd7",
              zerolinecolor: "#d9ddd7",
            },
            yaxis: {
              automargin: true,
            },
          }}
        />
      )}
    </section>
  );
}
