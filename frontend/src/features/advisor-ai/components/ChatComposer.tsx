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
      className="surface-card flex flex-col gap-4 p-4"
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={4}
        placeholder="Ask about your supplier network..."
        className="textarea-field rounded-[1.5rem] text-sm leading-6 text-[var(--text-secondary)]"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Keep questions detailed here for better supplier-specific responses.
        </p>
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="btn-primary px-5 text-sm"
        >
          {isLoading ? "Analyzing..." : "Send to Advisor"}
        </button>
      </div>
    </form>
  );
}
