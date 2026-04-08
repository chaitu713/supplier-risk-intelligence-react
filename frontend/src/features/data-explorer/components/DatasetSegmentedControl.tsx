import type { DatasetKey } from "../../../api/datasets";

interface DatasetSegmentedControlProps {
  value: DatasetKey;
  onChange: (value: DatasetKey) => void;
}

const options: Array<{ value: DatasetKey; label: string }> = [
  { value: "suppliers", label: "Suppliers" },
  { value: "esg", label: "ESG" },
  { value: "transactions", label: "Transactions" },
];

export function DatasetSegmentedControl({
  value,
  onChange,
}: DatasetSegmentedControlProps) {
  return (
    <div
      className="inline-flex rounded-2xl border bg-[var(--surface)] p-1 shadow-sm"
      style={{ borderColor: "var(--border)" }}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-white text-[var(--primary)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--primary)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
