import React from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({
  title = "Nenhum resultado encontrado",
  message = "Não encontramos nenhum dado para exibir no momento.",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Ícone */}
      <div className="mb-4 text-slate-400">
        {icon || (
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
            />
          </svg>
        )}
      </div>

      {/* Textos */}
      <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>

      <p className="text-slate-500 max-w-sm mx-auto mb-6">{message}</p>

      {/* Ação opcional */}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
