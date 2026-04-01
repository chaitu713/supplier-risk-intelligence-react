import { useState } from "react";

interface ChatComposerProps {
  isLoading: boolean;
  initialValue?: string;
  onSubmit: (message: string) => Promise<void> | void;
}

export function ChatComposer({
  isLoading,
  initialValue = "",
  onSubmit,
}: ChatComposerProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    await onSubmit(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-[2rem] border border-blue-100/80 bg-white/95 p-4 shadow-[0_16px_48px_rgba(37,99,235,0.08)]"
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={4}
        placeholder="Ask about your supplier network..."
        className="resize-none rounded-[1.5rem] border border-blue-100 bg-blue-50/40 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-700 focus:bg-white"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Keep questions detailed here for better supplier-specific responses.
        </p>
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? "Analyzing..." : "Send to Advisor"}
        </button>
      </div>
    </form>
  );
}
