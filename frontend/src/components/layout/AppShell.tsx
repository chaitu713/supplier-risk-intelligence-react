import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { to: "/", label: "Document Ingestion" },
  { to: "/data-explorer", label: "Data Explorer" },
  { to: "/overview-dashboard", label: "Overview Dashboard" },
  { to: "/risk-monitoring", label: "Risk Monitoring" },
  { to: "/supplier-advisor-ai", label: "Supplier Advisor AI" },
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-20 border-b border-blue-100/80 bg-white/90 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-white text-slate-600 ring-1 ring-blue-100 hover:bg-blue-50/60"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <aside className="fixed inset-y-0 left-0 hidden w-80 border-r border-blue-100/70 bg-white/88 px-5 py-6 backdrop-blur lg:block">
        <div className="rounded-[2rem] border border-blue-200/70 bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_52%,#38bdf8_100%)] px-5 py-6 text-white shadow-[0_20px_60px_rgba(37,99,235,0.2)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
            Supplier Intelligence
          </p>
          <h1 className="mt-3 text-xl font-semibold leading-tight">
            Executive Operations Console
          </h1>
          <p className="mt-2 text-sm leading-6 text-blue-50/90">
            A cleaner workspace for document intake, supplier risk reviews, and AI-assisted sourcing analysis.
          </p>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-blue-50/60 hover:text-blue-800 hover:shadow-sm"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 rounded-3xl border border-blue-100 bg-white px-4 py-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Workspace Focus
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Review uploads, launch due diligence faster, and keep AI responses readable enough for decision-making.
          </p>
        </div>
      </aside>

      <main className="lg:pl-80">{children}</main>
    </div>
  );
}
