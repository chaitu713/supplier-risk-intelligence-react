import type { CountryDistributionItem } from "../../../api/analytics";
import { PlotlyChart } from "../../../components/common/PlotlyChart";

interface CountryBarChartProps {
  items: CountryDistributionItem[];
  isLoading: boolean;
}

export function CountryBarChart({ items, isLoading }: CountryBarChartProps) {
  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Suppliers by Country</h3>
        <p className="mt-1 text-sm text-slate-500">
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
        <div className="rounded-[1.5rem] border border-dashed border-blue-200 bg-blue-50/50 px-6 py-16 text-center text-sm text-slate-500">
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
                color: "#2563eb",
                line: { color: "#bfdbfe", width: 1 },
              },
              hovertemplate: "%{y}: %{x}<extra></extra>",
            },
          ]}
          layout={{
            margin: { l: 90, r: 24, t: 8, b: 36 },
            xaxis: {
              title: { text: "Suppliers" },
              gridcolor: "#dbeafe",
              zerolinecolor: "#dbeafe",
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
