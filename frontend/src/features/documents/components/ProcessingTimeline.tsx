import type { IngestionJob, IngestionStep } from "../../../api/documents";

const stepStyles: Record<IngestionStep["status"], string> = {
  pending: "bg-blue-50/50 text-slate-500 border-blue-100",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  failed: "bg-rose-50 text-rose-700 border-rose-200",
};

interface ProcessingTimelineProps {
  job: IngestionJob | undefined;
  isLoading: boolean;
}

export function ProcessingTimeline({
  job,
  isLoading,
}: ProcessingTimelineProps) {
  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
        <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-14 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Processing Timeline</h3>
          <p className="mt-1 text-sm text-slate-500">
            Live ingestion status across upload, extraction, parsing, and persistence.
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
          {job?.status ?? "idle"}
        </span>
      </div>

      {job ? (
        <ol className="mt-6 space-y-3">
          {job.steps.map((step) => (
            <li
              key={step.name}
              className={`rounded-2xl border px-4 py-4 ${stepStyles[step.status]}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold capitalize">{step.name}</span>
                <span className="text-xs font-medium uppercase tracking-wide">
                  {step.status}
                </span>
              </div>
              {step.message ? (
                <p className="mt-2 text-sm opacity-90">{step.message}</p>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-6 text-sm text-slate-500">
          Start an ingestion job to see the live pipeline timeline here.
        </div>
      )}
    </section>
  );
}
