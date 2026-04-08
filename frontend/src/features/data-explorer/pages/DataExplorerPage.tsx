import { useMemo, useState } from "react";

import { ApiError } from "../../../api/client";
import type { DatasetKey } from "../../../api/datasets";
import { DatasetSegmentedControl } from "../components/DatasetSegmentedControl";
import { DatasetSummaryCards } from "../components/DatasetSummaryCards";
import { DatasetTable } from "../components/DatasetTable";
import { useDatasetExplorer } from "../hooks/useDatasetExplorer";

const datasetDescriptions: Record<DatasetKey, string> = {
  suppliers: "Browse supplier master data including geography, category, and certification.",
  esg: "Inspect environmental, social, and governance metrics captured for suppliers.",
  transactions: "Review transaction-level procurement records and operational performance inputs.",
};

export function DataExplorerPage() {
  const [dataset, setDataset] = useState<DatasetKey>("suppliers");
  const datasetQuery = useDatasetExplorer(dataset);

  const records = useMemo(() => datasetQuery.data ?? [], [datasetQuery.data]);
  const columnCount = records[0] ? Object.keys(records[0]).length : 0;
  const errorMessage = getErrorMessage(datasetQuery.error);

  return (
    <div className="page-shell">
      <div className="flex w-full flex-col gap-8">
        <header className="page-header px-8 py-8">
          <p className="eyebrow text-sm">
            Data Explorer
          </p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
                Browse raw supplier, ESG, and transaction datasets
              </h1>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                This page mirrors the current Streamlit Data Explorer: choose a dataset,
                inspect quick stats, and review the table preview returned by the backend.
              </p>
            </div>

            <DatasetSegmentedControl value={dataset} onChange={setDataset} />
          </div>
        </header>

        <section className="surface-card p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">
                {datasetLabel(dataset)}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {datasetDescriptions[dataset]}
              </p>
            </div>
            <span className="tag tag-primary px-3 py-1 text-xs font-medium uppercase tracking-wide">
              Backend-powered
            </span>
          </div>
        </section>

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        <DatasetSummaryCards totalRows={records.length} totalColumns={columnCount} />

        <DatasetTable records={records} isLoading={datasetQuery.isLoading} />
      </div>
    </div>
  );
}

function datasetLabel(dataset: DatasetKey): string {
  if (dataset === "suppliers") {
    return "Suppliers";
  }

  if (dataset === "esg") {
    return "ESG";
  }

  return "Transactions";
}

function getErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong while loading dataset records.";
}
