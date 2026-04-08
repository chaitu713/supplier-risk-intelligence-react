interface DatasetSummaryCardsProps {
  totalRows: number;
  totalColumns: number;
}

export function DatasetSummaryCards({
  totalRows,
  totalColumns,
}: DatasetSummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SummaryCard label="Total Rows" value={totalRows.toLocaleString()} />
      <SummaryCard label="Columns" value={String(totalColumns)} />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mono mt-3 text-3xl font-semibold tracking-tight text-[var(--text)]">
        {value}
      </p>
    </div>
  );
}
