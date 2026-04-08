const suggestions = [
  "Which suppliers have the highest risk scores?",
  "Which countries have the most high-risk suppliers?",
  "Recommend low-risk suppliers for sourcing",
];

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {suggestions.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="surface-subtle px-4 py-4 text-left text-sm font-medium text-[var(--text-secondary)] shadow-sm transition hover:text-[var(--primary)]"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
