import type { RiskSupplierItem } from "../../../api/risk";
import { PlotlyChart } from "../../../components/common/PlotlyChart";

interface TopRiskSuppliersChartProps {
  items: RiskSupplierItem[];
  isLoading: boolean;
}

export function TopRiskSuppliersChart({
  items,
  isLoading,
}: TopRiskSuppliersChartProps) {
  const maxValue = Math.max(...items.map((item) => item.riskScore), 1);

  if (!isLoading) {
    if (items.length === 0) {
      return (
        <section className="rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Top 10 High-Risk Suppliers</h3>
            <p className="mt-1 text-sm text-slate-500">
              Highest-risk suppliers ranked by risk score.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-dashed border-blue-200 bg-blue-50/50 px-6 py-16 text-center text-sm text-slate-500">
            No top-risk supplier data available yet.
          </div>
        </section>
      );
    }

    return (
      <section className="rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Top 10 High-Risk Suppliers</h3>
          <p className="mt-1 text-sm text-slate-500">
            Highest-risk suppliers ranked by risk score.
          </p>
        </div>
        <PlotlyChart
          className="h-[420px]"
          data={[
            {
              type: "bar",
              orientation: "h",
              y: items.map((item) => item.supplierName).reverse(),
              x: items.map((item) => item.riskScore).reverse(),
              marker: {
                color: "#2563eb",
                line: { color: "#bfdbfe", width: 1 },
              },
              customdata: items
                .map((item) => [item.country ?? "Unknown", item.category ?? "Unspecified"])
                .reverse(),
              hovertemplate:
                "%{y}<br>Risk score %{x:.2f}<br>%{customdata[0]}<br>%{customdata[1]}<extra></extra>",
            },
          ]}
          layout={{
            margin: { l: 170, r: 24, t: 8, b: 36 },
            xaxis: {
              title: { text: "Risk score" },
              gridcolor: "#dbeafe",
              zerolinecolor: "#dbeafe",
            },
            yaxis: {
              automargin: true,
            },
          }}
        />
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Top 10 High-Risk Suppliers</h3>
        <p className="mt-1 text-sm text-slate-500">
          Highest-risk suppliers ranked by risk score.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-12 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.supplierId}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.supplierName}</p>
                  <p className="text-xs text-slate-500">
                    {[item.country, item.category].filter(Boolean).join(" • ")}
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {item.riskScore.toFixed(2)}
                </span>
              </div>
              <div className="h-3 rounded-full bg-blue-50 ring-1 ring-blue-100">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-700 to-sky-500"
                  style={{ width: `${(item.riskScore / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
