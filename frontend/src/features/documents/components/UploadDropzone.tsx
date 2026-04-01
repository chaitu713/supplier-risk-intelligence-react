import { useId } from "react";
import { formatFileSize } from "../../../utils/formatting";

interface UploadDropzoneProps {
  label: string;
  file: File | null;
  accept?: string;
  onFileSelect: (file: File | null) => void;
}

export function UploadDropzone({
  label,
  file,
  accept = ".pdf,application/pdf",
  onFileSelect,
}: UploadDropzoneProps) {
  const inputId = useId();

  return (
    <div className="space-y-3">
      <label
        htmlFor={inputId}
        className="group flex min-h-44 cursor-pointer flex-col justify-between rounded-[1.75rem] border border-blue-100 bg-[linear-gradient(180deg,#fbfdff_0%,#f3f8ff_100%)] px-5 py-5 text-left transition hover:border-blue-300 hover:shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-blue-100">
            <span className="text-lg">PDF</span>
          </div>
          <span className="rounded-full bg-blue-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            {file ? "Selected" : "Required"}
          </span>
        </div>

        <div className="space-y-2">
          <span className="block text-base font-semibold text-slate-900">
            {file ? file.name : label}
          </span>
          <span className="block text-sm leading-6 text-slate-500">
            Drag and drop a PDF here, or use browse to attach the file.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {file ? (
            <>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                {formatFileSize(file.size)}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-blue-100">
                {file.type || "application/pdf"}
              </span>
            </>
          ) : (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-blue-100 transition group-hover:ring-blue-200">
              Click to browse
            </span>
          )}
        </div>
      </label>

      <input
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => onFileSelect(event.target.files?.[0] ?? null)}
      />

      {file ? (
        <button
          type="button"
          onClick={() => onFileSelect(null)}
          className="inline-flex items-center rounded-full px-1 text-xs font-semibold text-rose-600 transition hover:text-rose-700"
        >
          Remove file
        </button>
      ) : null}
    </div>
  );
}
