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
    <div className="inline-flex rounded-2xl border border-blue-100/80 bg-white/95 p-1 shadow-[0_10px_24px_rgba(37,99,235,0.08)]">
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-white text-blue-700 shadow-sm ring-1 ring-blue-100"
                : "text-slate-500 hover:text-blue-700"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
