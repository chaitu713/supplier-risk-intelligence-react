import type { DatasetRecord } from "../../../api/datasets";

interface DatasetTableProps {
  records: DatasetRecord[];
  isLoading: boolean;
}

export function DatasetTable({ records, isLoading }: DatasetTableProps) {
  const columns = records[0] ? Object.keys(records[0]) : [];

  return (
    <section className="surface-card p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[var(--text)]">Dataset Preview</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Showing the first 100 rows from the selected dataset, matching the current
          Streamlit behavior.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table min-w-full text-left">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} className="whitespace-nowrap px-4 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-4" colSpan={Math.max(columns.length, 1)}>
                    <div className="h-6 animate-pulse rounded bg-slate-100" />
                  </td>
                </tr>
              ))
            ) : records.length > 0 ? (
              records.map((record, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(record).map(([column, value]) => (
                    <td
                      key={`${rowIndex}-${column}`}
                      className="whitespace-nowrap px-4 py-3 text-sm text-[var(--text-secondary)]"
                    >
                      {formatCellValue(value)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-10 text-center text-sm text-[var(--muted)]"
                  colSpan={Math.max(columns.length, 1)}
                >
                  No records found for the selected dataset.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }

  return String(value);
}
