import type { AdvisorMessage } from "../../../api/advisor";
import { StructuredContent } from "../../../components/common/StructuredContent";
import { formatDateTime } from "../../../utils/formatting";

interface ChatMessageProps {
  message: AdvisorMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-xs font-semibold text-white shadow-sm">
          AI
        </div>
      ) : null}
      <div
        className={`max-w-3xl rounded-[1.75rem] px-5 py-4 text-sm shadow-sm ${
          isUser
            ? "bg-blue-700 text-white"
            : "border border-blue-100/90 bg-white text-slate-700"
        }`}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
              isUser ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {isUser ? "Your Question" : "Supplier Advisor AI"}
          </p>
          <p className={`text-xs ${isUser ? "text-slate-300" : "text-slate-400"}`}>
            {formatDateTime(message.createdAt)}
          </p>
        </div>
        {isUser ? (
          <div className="whitespace-pre-wrap leading-7">{message.content}</div>
        ) : (
          <StructuredContent content={message.content} />
        )}
      </div>
      {isUser ? (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-xs font-semibold text-blue-800 shadow-sm">
          You
        </div>
      ) : null}
    </div>
  );
}
