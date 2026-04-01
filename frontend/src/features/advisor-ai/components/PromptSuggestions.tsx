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
          className="rounded-2xl border border-blue-100 bg-white px-4 py-4 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
