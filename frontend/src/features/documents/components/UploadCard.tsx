import type { ReactNode } from "react";

interface UploadCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tintClassName: string;
  children: ReactNode;
}

export function UploadCard({
  icon,
  title,
  description,
  tintClassName,
  children,
}: UploadCardProps) {
  return (
    <section className="rounded-[2rem] border border-blue-100/80 bg-white/95 p-5 shadow-[0_14px_40px_rgba(37,99,235,0.08)]">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg shadow-sm ${tintClassName}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
