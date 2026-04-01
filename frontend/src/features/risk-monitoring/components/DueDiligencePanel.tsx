import { useState } from "react";

import type { DueDiligenceResponse, RiskSupplierItem } from "../../../api/risk";
import { StructuredContent } from "../../../components/common/StructuredContent";

interface DueDiligencePanelProps {
  suppliers: RiskSupplierItem[];
  result: DueDiligenceResponse | undefined;
  isLoading: boolean;
  onRun: (supplierId: number) => void;
}

export function DueDiligencePanel({
  suppliers,
  result,
  isLoading,
  onRun,
}: DueDiligencePanelProps) {
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | "">("");

  return (
    <section className="rounded-[2rem] border border-blue-100/80 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
            Due Diligence Agent
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Structured supplier investigation
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Run AI-assisted evaluation for one of the current high-risk suppliers and review the output in an executive summary layout.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-3xl border border-blue-100 bg-blue-50/60 p-4 xl:max-w-xl">
          <div className="flex flex-col gap-3 md:flex-row">
            <select
              value={selectedSupplierId}
              onChange={(event) =>
                setSelectedSupplierId(event.target.value ? Number(event.target.value) : "")
              }
              className="min-h-12 flex-1 rounded-2xl border border-blue-100 bg-white px-4 text-sm text-slate-700 outline-none ring-0 transition focus:border-blue-700"
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.supplierId} value={supplier.supplierId}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={selectedSupplierId === "" || isLoading}
              onClick={() => selectedSupplierId !== "" && onRun(selectedSupplierId)}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isLoading ? "Running..." : "Run Analysis"}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Best for reviewing suppliers already flagged by the risk dashboard.
          </p>
        </div>
      </div>

      {result ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-[2rem] border border-blue-200 bg-[linear-gradient(135deg,#1d4ed8_0%,#1e40af_100%)] p-6 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                  Supplier Reviewed
                </p>
                <h4 className="mt-2 text-2xl font-semibold">{result.supplier}</h4>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                  Risk findings are organized below into headline scores, critical issues, and the AI-generated recommendation.
                </p>
              </div>
              <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm text-white ring-1 ring-white/15">
                Overall assessment: <span className="font-semibold">{result.overall}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Metric label="Operational Risk" value={result.opRisk} />
              <Metric label="ESG Risk" value={result.esgRisk} />
              <Metric label="Overall Risk" value={result.overall} />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-blue-100 bg-blue-50/50 p-5">
              <h5 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Key Issues
              </h5>
              <ul className="mt-4 space-y-3">
                {result.issues.map((issue) => (
                  <li
                    key={issue}
                  className="rounded-2xl border border-blue-100 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{issue}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm">
              <h5 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Recommendation
              </h5>
              <div className="mt-4 rounded-2xl bg-blue-50/50 px-4 py-4">
                <StructuredContent content={result.aiSummary} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white/15 px-4 py-4 ring-1 ring-white/15 backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
