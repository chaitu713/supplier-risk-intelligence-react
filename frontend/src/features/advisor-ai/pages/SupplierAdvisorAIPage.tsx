import { useEffect, useMemo, useState } from "react";

import { ApiError } from "../../../api/client";
import { ChatComposer } from "../components/ChatComposer";
import { ChatMessage } from "../components/ChatMessage";
import { PromptSuggestions } from "../components/PromptSuggestions";
import {
  useAdvisorSession,
  useCreateAdvisorSession,
  useSendAdvisorMessage,
} from "../hooks/useAdvisorAI";

export function SupplierAdvisorAIPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const createSessionMutation = useCreateAdvisorSession();
  const sessionQuery = useAdvisorSession(sessionId);
  const sendMessageMutation = useSendAdvisorMessage(sessionId);

  useEffect(() => {
    if (!sessionId && !createSessionMutation.isPending && !createSessionMutation.data) {
      createSessionMutation.mutate(undefined, {
        onSuccess: (session) => setSessionId(session.sessionId),
      });
    }
  }, [createSessionMutation, sessionId]);

  const messages = useMemo(() => sessionQuery.data?.messages ?? [], [sessionQuery.data]);

  const handleSend = async (message: string) => {
    if (!sessionId) {
      return;
    }

    await sendMessageMutation.mutateAsync(message);
  };

  const errorMessage = getErrorMessage(
    createSessionMutation.error ?? sessionQuery.error ?? sendMessageMutation.error,
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8">
        <header className="rounded-[2rem] border border-blue-100/80 bg-white/95 px-8 py-8 shadow-[0_20px_60px_rgba(37,99,235,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Supplier Advisor AI
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            AI-powered guidance across supplier risk, ESG, and performance
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            This page mirrors the Streamlit advisor chat with example prompts,
            session-based message history, and backend-powered supplier analysis.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {sessionId ? "Session active" : "Initializing session"}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
              {messages.length} message{messages.length === 1 ? "" : "s"}
            </span>
          </div>
        </header>

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.4fr]">
          <aside className="rounded-[2rem] border border-blue-100/80 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Suggested Prompts
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              Ask targeted sourcing questions
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use the quick prompts below or write your own question in the composer.
            </p>

            <div className="mt-5">
              <PromptSuggestions onSelect={(prompt) => void handleSend(prompt)} />
            </div>

            <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50/50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Best Use
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Ask for supplier comparisons, geographic concentration risk, ESG concerns, or alternatives for low-risk sourcing.
              </p>
            </div>
          </aside>

          <div className="space-y-5">
            <section className="rounded-[2rem] border border-blue-100/80 bg-white/95 p-6 shadow-[0_16px_48px_rgba(37,99,235,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Conversation
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">
                    Supplier analysis workspace
                  </h2>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
                  {sendMessageMutation.isPending ? "Generating reply" : "Live"}
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="mt-6 rounded-[1.75rem] border border-dashed border-blue-200 bg-blue-50/50 px-6 py-14 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-700 text-2xl text-white shadow-lg">
                    AI
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    Supplier Advisor AI Ready
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Ask anything about supplier risk, ESG performance, or operational insights.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={`${message.role}-${message.createdAt}-${index}`}
                      message={message}
                    />
                  ))}
                </div>
              )}
            </section>

            <ChatComposer
              isLoading={
                createSessionMutation.isPending ||
                sessionQuery.isLoading ||
                sendMessageMutation.isPending
              }
              onSubmit={handleSend}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function getErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong while loading the advisor experience.";
}
